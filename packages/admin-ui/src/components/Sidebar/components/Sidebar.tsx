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
 *  └── SidebarCorner
 *       └── SidebarItem
 *           └── SidebarSection
 *               └── SidebarSectionItem
 *```
 * @example
 * const state = useSidebarState()
 *
 * <Sidebar state={state}>
 *  <SidebarCorner>
 *    <SidebarItem>
 *      <SidebarSection>
 *        <SidebarSectionItem onClick={() => navigate({ to: "/admin/page1" })}>
 *          Title
 *        </SidebarSectionItem>
 *      </SidebarSection>
 *    </SidebarItem
 *  </SidebarCorner>
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

  return (
    <Fragment>
      <tag.div
        csx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: SCALES.MAX_SIDEBAR_WIDTH,
          minWidth: SCALES.FIXED_AREA_WIDTH,
          outline: 'none',
          borderRight: '1px solid',
          borderColor: 'mid.tertiary',
          bg: state.isReduced() ? 'light.primary' : 'sidebar.light',
          boxShadow:
            state.selectedItem?.expandable && state.layout.reduced
              ? '1px 0px 6px -2px rgb(0 0 0 / 30%)'
              : 'unset',
          ...rootProps.csx,
        }}
        {...rootProps}
      >
        <tag.nav
          ref={ref}
          as="nav"
          csx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingY: '0.625rem',
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
          bg: state.isReduced() ? 'light.primary' : 'sidebar.light',
          width: '3.4375rem',
          top: 0,
          bottom: 0,
          zIndex: 'sidebarOverlay',
          position: 'fixed',
          maxHeight: '100%',
        }}
      />
      <SidebarBackdrop
        state={state}
        loading={
          state.selectedItem?.expandable && loading && !state.layout.reduced
        }
      />
    </Fragment>
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
