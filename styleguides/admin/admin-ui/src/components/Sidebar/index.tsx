import React, {
  cloneElement,
  FunctionComponentElement,
  ReactElement,
  useState,
} from 'react'
import { useSystem } from '@vtex/admin-core'
import { SystemComponent } from '../../types'
import {
  SidebarCorner,
  SidebarCornerProps,
  SidebarItem,
  SidebarSubItem,
  useCompositeState,
  CompositeGroup,
  _SidebarItemProps,
} from './components'
import { SidebarProvider } from './context'
import { AnchorDirection, Item } from './types'
import { Box } from '../Box'
import { SidebarBackdrop } from './components/Backdrop'

export interface SidebarProps extends SystemComponent {
  children: FunctionComponentElement<SidebarCornerProps>[]
  anchor?: AnchorDirection
}

/**
 * Sidebar component.
 *
 * The sidebar structure is as follows:
 * ```bash
 * └── Sidebar
 *  └── Sidebar.Header or Sidebar.Footer
 *       └── Sidebar.Item
 *           └── Sidebar.Section
 *               └── Sidebar.SubItem
 *```
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello")}
 *         sections={[
 *            title: "Example",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi")}>
 *                Example
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 * </Sidebar>
 * ```
 */
export function Sidebar(props: SidebarProps) {
  const [currentItem, setCurrentItem] = useState<Item | null>(null)
  const [selectedItemsMemory, setSelectedItemsMemory] = useState<Item[]>([])
  const [collapse, setCollapse] = useState<boolean | null>(null)
  const { children, anchor = 'left', styleOverrides = {}, ...baseProps } = props
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
        direction: anchor,
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
        styles={styleOverrides}
      >
        <Box
          element="nav"
          themeKey={'components.sidebar.root'}
          {...rootState}
          {...baseProps}
        >
          <CompositeGroup {...rootState} aria-label={'Sidebar'} role="menu">
            {(itemProps) =>
              children.map((child) =>
                cloneElement(child as ReactElement, {
                  ...itemProps,
                })
              )
            }
          </CompositeGroup>
        </Box>
      </Box>
      <SidebarBackdrop />
    </SidebarProvider>
  )
}

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
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello")}
 *         sections={[
 *            title: "Example",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi")}>
 *                Example
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 * </Sidebar>
 * ```
 */
Sidebar.Item = SidebarItem

/**
 * Sidebar.SubItem corresponds to an item of the sidebar's
 * second level, the top most sidebar level.
 * This is usually what users will use to navigate
 * between pages.
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello")}
 *         sections={[
 *            title: "Example",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi")}>
 *                Example
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 * </Sidebar>
 * ```
 */
Sidebar.SubItem = SidebarSubItem

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
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello")}
 *         sections={[
 *            title: "Example",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi")}>
 *                Example
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 * </Sidebar>
 * ```
 */
Sidebar.Header = (props: SidebarCornerProps) => (
  <SidebarCorner {...props} scope={'top'} />
)

/**
 * Sidebar.Footer will stick whatever is inside
 * of it to the bottom of the sidebar.
 *
 * @example
 * ```jsx
 * import { Sidebar } from `@vtex/admin-ui`
 *
 * <Sidebar>
 *    <Sidebar.Header>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello, I'm at the top!")}
 *         sections={[
 *            title: "Example at the top",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi, from the top!")}>
 *                I'm at the top
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Header>
 *    <Sidebar.Footer>
 *      <Sidebar.Item
 *         selected={false}
 *         onClick={() => console.log("Hello, I'm at the bottom!")}
 *         sections={[
 *            title: "Example at the bottom",
 *            children: [
 *              <Sidebar.SubItem
 *                onClick={() => console.log("Hi, from the bottom!")}>
 *                I'm at the bottom
 *              </Sidebar.SubItem>
 *            ]
 *         ]}
 *      />
 *    </Sidebar.Footer>
 * </Sidebar>
 * ```
 */
Sidebar.Footer = (props: SidebarCornerProps) => (
  <SidebarCorner {...props} scope={'bottom'} />
)
