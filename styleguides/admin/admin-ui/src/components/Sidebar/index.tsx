import React, {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useState,
} from 'react'
import { useSystem } from '@vtex/admin-core'
import { Box } from '@vtex/admin-primitives'
import {
  SidebarCorner,
  SidebarCornerProps,
  SidebarItem,
  useCompositeState,
  CompositeGroup,
  SidebarBackdrop,
  SidebarSkeleton,
} from './components'
import { SidebarProvider } from './context'
import { AnchorDirection, Item } from './types'
import { SystemComponent } from '../../types'

export interface SidebarProps extends SystemComponent {
  children: ReactNode
  direction?: AnchorDirection
  loading?: boolean
}

function _Sidebar(props: SidebarProps) {
  const [currentItem, setCurrentItem] = useState<Item | null>(null)
  const [selectedItemsMemory, setSelectedItemsMemory] = useState<Item[]>([])
  const [collapse, setCollapse] = useState<boolean | null>(null)
  const [showCollapseButton, setShowCollapseButton] = useState(false)
  const {
    children,
    loading = false,
    direction = 'left',
    csx = {},
    ...baseProps
  } = props
  const { cn } = useSystem()

  const rootState = useCompositeState({
    baseId: 'sidebar-menu-base-id--',
    orientation: 'vertical',
    wrap: 'vertical',
    loop: true,
  })

  return (
    <SidebarProvider
      value={{
        direction,
        currentItem,
        collapse,
        selectedItemsMemory,
        setCurrentItem,
        setCollapse,
        setSelectedItemsMemory,
        rootState,
      }}
    >
      <Box
        className={cn({
          themeKey: 'components.sidebar.container',
          backgroundColor:
            !currentItem ||
            !currentItem.isCollapsible ||
            (collapse && currentItem.isCollapsible)
              ? 'light.primary'
              : 'sidebar.light',
          boxShadow:
            collapse && currentItem
              ? '1px 0px 6px -2px rgb(0 0 0 / 30%)'
              : 'unset',
        })}
        csx={csx}
      >
        <Box
          element="nav"
          csx={{
            themeKey: 'components.sidebar.root',
          }}
          {...rootState}
          {...baseProps}
        >
          {!loading && (
            <CompositeGroup {...rootState} aria-label={'Sidebar'} role="menu">
              {(itemProps) =>
                Children.map(children, (child, index) =>
                  cloneElement(child as ReactElement, {
                    ...itemProps,
                    key: index,
                    setShowCollapseButton,
                  })
                )
              }
            </CompositeGroup>
          )}
          {loading && (
            <>
              <SidebarSkeleton />
              <SidebarSkeleton amount={2} />
            </>
          )}
        </Box>
      </Box>
      <SidebarBackdrop
        showCollapseButton={showCollapseButton}
        setShowCollapseButton={setShowCollapseButton}
      />
    </SidebarProvider>
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
  Header: (props: SidebarCornerProps) => (
    <SidebarCorner {...props} scope="top" />
  ),
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
  Footer: (props: SidebarCornerProps) => (
    <SidebarCorner {...props} scope="bottom" />
  ),
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
