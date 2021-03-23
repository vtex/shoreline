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

function _Sidebar(props: SidebarProps) {
  const { children, loading = false, csx = {}, state, ...baseProps } = props

  return (
    <Fragment>
      <Box
        csx={{
          themeKey: 'components.sidebar.container',
          backgroundColor: state.isReduced()
            ? 'light.primary'
            : 'sidebar.light',
          boxShadow:
            // state.reduced.reduced && state.selectedItem
            state.isReduced() ? '1px 0px 6px -2px rgb(0 0 0 / 30%)' : 'unset',
          ...csx,
        }}
      >
        <Box
          element="nav"
          csx={{
            themeKey: 'components.sidebar.root',
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
 *  └── Sidebar.Header or Sidebar.Footer
 *       └── Sidebar.Item
 *           └── Sidebar.Item.Section
 *               └── Sidebar.Item.Section.Item
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/promotions" })}>
 *       <Sidebar.Item.Section title={"Promotions"}>
 *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/promotions" })}>
 *         Promotions
 *        </Sidebar.Item.Section.Item>
 *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/discounts"})} >
 *         Discounts
 *        </Sidebar.Item.Section.Item>
 *       </Sidebar.Item.Section>
 *      </Sidebar.Item>
 *    </Sidebar.Header>
 *    <Sidebar.Footer>
 *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/apps" })}>
 *       <Sidebar.Item.Section title={"Apps"}>
 *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps" })}>
 *         Installed apps
 *        </Sidebar.Item.Section.Item>
 *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps-store"})} >
 *         Apps store
 *        </Sidebar.Item.Section.Item>
 *       </Sidebar.Item.Section>
 *      </Sidebar.Item>
 *    </Sidebar.Footer>
 * </Sidebar>
 * ```
 */
export const Sidebar = Object.assign(_Sidebar, {
  /**
   * Sidebar.Header will stick whatever is inside
   * of it to the top of the sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Header>
   *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/promotions" })}>
   *       <Sidebar.Item.Section title={"Promotions"}>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/promotions" })}>
   *         Promotions
   *        </Sidebar.Item.Section.Item>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/discounts"})} >
   *         Discounts
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Header>
   * </Sidebar>
   * ```
   */
  Top: SidebarCorner,
  /**
   * Sidebar.Footer will stick whatever is inside
   * of it to the bottom of the sidebar.
   *
   * @example
   * ```jsx
   * import { Sidebar } from `@vtex/admin-ui`
   *
   * <Sidebar>
   *    <Sidebar.Footer>
   *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/apps" })}>
   *       <Sidebar.Item.Section title={"Apps"}>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps" })}>
   *         Installed apps
   *        </Sidebar.Item.Section.Item>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps-store"})} >
   *         Apps store
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Footer>
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
   *    <Sidebar.Header>
   *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/promotions" })}>
   *       <Sidebar.Item.Section title={"Promotions"}>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/promotions" })}>
   *         Promotions
   *        </Sidebar.Item.Section.Item>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/discounts"})} >
   *         Discounts
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Header>
   *    <Sidebar.Footer>
   *      <Sidebar.Item selected={someCondition} onClick={() => navigate({ to: "/apps" })}>
   *       <Sidebar.Item.Section title={"Apps"}>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps" })}>
   *         Installed apps
   *        </Sidebar.Item.Section.Item>
   *        <Sidebar.Item.Section.Item onClick={() => navigate({ to: "/apps-store"})} >
   *         Apps store
   *        </Sidebar.Item.Section.Item>
   *       </Sidebar.Item.Section>
   *      </Sidebar.Item>
   *    </Sidebar.Footer>
   * </Sidebar>
   * ```
   */
  Item: SidebarItem,
})

export { useSidebarState, SidebarState } from './hooks'

export interface SidebarProps extends SystemComponent {
  children: ReactNode
  loading?: boolean
  state: SidebarState
}
