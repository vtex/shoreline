import React, {
  Children,
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
} from 'react'
import { Box } from '@vtex/admin-primitives'
import {
  SidebarCorner,
  SidebarItem,
  CompositeGroup,
  SidebarBackdrop,
  SidebarSkeleton,
} from './components'
import { SystemComponent } from '../../types'
import { SidebarState } from './hooks'
import { SidebarContext } from './context'
import { SCALES } from './consts'

function _Sidebar(props: SidebarProps) {
  const { children, loading = false, csx = {}, state, ...baseProps } = props

  return (
    <Fragment>
      <Box
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
          backgroundColor: state.isReduced()
            ? 'light.primary'
            : 'sidebar.light',
          boxShadow: state.isReduced()
            ? '1px 0px 6px -2px rgb(0 0 0 / 30%)'
            : 'unset',
          ...csx,
        }}
      >
        <Box
          element="nav"
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
          {...state.composite}
          {...baseProps}
        >
          <SidebarContext.Provider value={state}>
            {!loading && (
              <CompositeGroup
                {...state.composite}
                aria-label={'Sidebar'}
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
        </Box>
      </Box>
      <SidebarBackdrop state={state} loading={loading} />
    </Fragment>
  )
}

/**
 * Sidebar component.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── Sidebar.Top or Sidebar.Bottom
 *       └── Sidebar.Item
 *           └── Sidebar.Item.Section
 *               └── Sidebar.Item.Section.Item
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar, useSidebarState } from `@vtex/admin-ui`
 *
 * const state = useSidebarState()
 *
 * <Sidebar state={state}>
 *    <Sidebar.Top>
 *      <Sidebar.Item label="Label">
 *       <Sidebar.Item.Section title="Title">
 *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/admin/page1" })}>
 *         Title
 *        </Sidebar.Item.Section.Item>
 *       </Sidebar.Item.Section>
 *      </Sidebar.Item>
 *    </Sidebar.Top>
 *    <Sidebar.Bottom>
 *      <Sidebar.Item label="Label">
 *       <Sidebar.Item.Section title="Title">
 *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/admin/page2" })}>
 *         Title
 *        </Sidebar.Item.Section.Item>
 *       </Sidebar.Item.Section>
 *      </Sidebar.Item>
 *    </Sidebar.Bottom>
 * </Sidebar>
 * ```
 */
export const Sidebar = Object.assign(_Sidebar, {
  /**
   * Sidebar.Top will stick whatever is inside
   * of it to the top of the sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Top>
   *      <Sidebar.Item>
   *       <Sidebar.Item.Section title="Example">
   *        <Sidebar.Item.Section.Item>
   *          Example
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Top>
   * </Sidebar>
   * ```
   */
  Top: SidebarCorner,
  /**
   * Sidebar.Bottom will stick whatever is inside
   * of it to the bottom of the sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Bottom>
   *      <Sidebar.Item>
   *       <Sidebar.Item.Section title="Example">
   *        <Sidebar.Item.Section.Item>
   *          Example
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Bottom>
   * </Sidebar>
   * ```
   */
  Bottom: SidebarCorner,
  /**
   * Sidebar.Item corresponds to an item of the sidebar's
   * first level. It can hold multiple sections exhibited
   * when the sidebar is expanded.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Bottom>
   *      <Sidebar.Item uniqueKey="" label="Example">
   *       <Sidebar.Item.Section title="Example">
   *        <Sidebar.Item.Section.Item>
   *          Example
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Bottom>
   * </Sidebar>
   *```
   */
  Item: SidebarItem,
})

export { useSidebarState, SidebarState } from './hooks'

export interface SidebarProps extends SystemComponent {
  children: ReactNode
  loading?: boolean
  state: SidebarState
}
