import type { ReactElement, Ref } from 'react'
import React, { Children, cloneElement, Fragment, forwardRef } from 'react'
import { tag } from '@vtex/admin-ui-react'
import { CompositeGroup } from 'reakit/Composite'

import type { BoxProps } from '../../Box'
import { SidebarBackdrop } from './SidebarBackdrop'
import { SidebarSkeleton } from './SidebarSkeleton'
import type { SidebarState } from '../hooks/useSidebarState'
import { SidebarContext } from './SidebarContext'
import { SCALES } from '../consts'

/**
 * Sidebar component.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── SidebarGroup
 *       └── SidebarItem
 *           └── SidebarSection
 *               └── SidebarSectionItem
 *```
 * @example
 * const state = useSidebarState()
 *
 * <Sidebar state={state}>
 *  <SidebarGroup>
 *    <SidebarItem>
 *      <SidebarSection>
 *        <SidebarSectionItem onClick={() => navigate({ to: "/admin/page1" })}>
 *          Title
 *        </SidebarSectionItem>
 *      </SidebarSection>
 *    </SidebarItem
 *  </SidebarGroup>
 * </Sidebar>
 */
export const Sidebar = forwardRef(function Sidebar(
  props: SidebarProps,
  ref: Ref<any>
) {
  const {
    children,
    loading = false,
    csx = {},
    rootProps = {},
    state,
    ...baseProps
  } = props

  const { showToggle, hideToggle } = state.layout

  return (
    <tag.div
      csx={{ display: 'flex', maxWidth: SCALES.MAX_SIDEBAR_WIDTH }}
      onMouseLeave={() => {
        const { setSelectedItem, selectedItem, selectedItemFallback } = state

        if (selectedItem?.uniqueKey !== selectedItemFallback?.uniqueKey) {
          setSelectedItem(selectedItemFallback)
        }

        hideToggle()
      }}
      onMouseEnter={showToggle}
    >
      <tag.div
        csx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: SCALES.MAX_SIDEBAR_WIDTH,
          minWidth: SCALES.FIXED_AREA_WIDTH,
          outline: 'none',
          borderRight: '$neutral',
          bg: '$primary',
          paddingY: '$xl',
          boxShadow:
            state.selectedItem?.expandable && state.layout.reduced
              ? '$overlay.center'
              : 'unset',
          ...rootProps.csx,
        }}
        {...rootProps}
      >
        <tag.nav
          ref={ref}
          csx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '$m',
            maxWidth: '16rem',
            height: '100%',
            width: '100%',
            overflow: 'initial',
          }}
          {...baseProps}
        >
          <SidebarContext.Provider value={state}>
            {!loading && (
              <CompositeGroup
                {...state.composite}
                aria-label="Sidebar"
                role="menu"
              >
                {(itemProps) =>
                  Children.map(children, (child, index) =>
                    cloneElement(child as ReactElement, {
                      ...itemProps,
                      index,
                      key: index,
                    })
                  )
                }
              </CompositeGroup>
            )}
          </SidebarContext.Provider>
          {loading && (
            <Fragment>
              <SidebarSkeleton />
              <SidebarSkeleton amount={2} />
            </Fragment>
          )}
        </tag.nav>
      </tag.div>
      <tag.div
        csx={{
          bg: '$secondary',
          width: '3.6775rem',
          top: 0,
          bottom: 0,
          position: 'fixed',
          maxHeight: '100%',
        }}
        onMouseEnter={showToggle}
      />
      <SidebarBackdrop state={state} loading={loading} />
    </tag.div>
  )
})

export interface SidebarProps extends BoxProps {
  /**
   * Whether the sidebar is loading or not.
   * @default false
   */
  loading?: boolean
  /**
   * Sidebar's state.
   * See `useSidebarState` for more information on this.
   */
  state: SidebarState
  /**
   * Sidebar root props. This element is the root sidebar's element.
   * If you're looking to customize the `nav` element within the
   * sidebar, use shorthand props instead.
   *
   * @default {}
   */
  rootProps?: BoxProps
}
