import React, { cloneElement, FunctionComponentElement, useState } from 'react'
import { useSystem } from '@vtex/admin-core'
import { SystemComponent } from '../../types'
import {
  ReakitMenuBar,
  useMenuBarState,
  SidebarCorner,
  SidebarCornerProps,
  SidebarItem,
  SidebarSubItem,
  SidebarBackdrop,
} from './components'
import { SidebarProvider } from './context'
import { AnchorDirection } from './utils'

export interface SidebarProps extends SystemComponent {
  children: FunctionComponentElement<Omit<SidebarCornerProps, 'secret'>>[]
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
  const [collapsed, setCollapsed] = useState(false)
  const { children, anchor = 'left', styleOverrides = {}, ...baseProps } = props
  const { cn } = useSystem()
  const state = useMenuBarState({
    baseId: 'sidebar-menu-base-id--',
    orientation: 'vertical',
    loop: true,
  })

  return (
    <SidebarProvider
      value={{
        direction: anchor,
        collapsed,
        setCollapsed,
      }}
    >
      <ReakitMenuBar
        aria-label={'Sidebar'}
        {...state}
        {...baseProps}
        role="navigation"
        className={cn({
          themeKey: 'components.sidebar',
          backgroundColor: collapsed ? 'white' : '#F8F9FA',
        })}
      >
        {children.map((child) =>
          cloneElement(child, {
            // @ts-ignore
            secret: { state },
          })
        )}
      </ReakitMenuBar>
      {!collapsed && <SidebarBackdrop />}
    </SidebarProvider>
  )
}

/**
 * Sidebar.Item corresponds to an item of the sidebar's
 * first level. It can hold multiple sections exhibited
 * when the sidebar is opened.
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
Sidebar.Item = SidebarItem

/**
 * Sidebar.SubItem corresponds to an item of the sidebar's
 * second level, the top most sidebar level.
 * This is usually what users will use to navigate.
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
Sidebar.SubItem = SidebarSubItem

/**
 * Sidebar.Header will stick whatever is inside
 * it to the top of the sidebar.
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
Sidebar.Header = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'top'} />
)

/**
 * Sidebar.Footer will stick whatever is inside
 * it to the bottom of the sidebar.
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
Sidebar.Footer = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'bottom'} />
)
