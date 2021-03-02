import React, { cloneElement, FunctionComponentElement, useState } from 'react'
import { useSystem } from '@vtex/admin-core'
import { SystemComponent } from '../../types'
import { ReakitMenuBar, useMenuBarState } from './components/AriaSidebar'
import { SidebarCorner, SidebarCornerProps } from './components/Corner'
import { SidebarItem } from './components/Item'
import { SidebarSubItem } from './components/SubItem'
import { SidebarBackdrop } from './components/Backdrop'
import { SidebarProvider } from './context'
import { AnchorDirection, SCALES } from './utils'

export interface SidebarProps extends SystemComponent {
  children: FunctionComponentElement<Omit<SidebarCornerProps, 'secret'>>[]
  anchor?: AnchorDirection
}

function useSidebar(props: SidebarProps) {
  const { anchor = 'left' } = props

  return {
    anchor,
    ...props,
  }
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
  const { children, anchor, ...baseProps } = useSidebar(props)
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingY: '0.625rem',
          justifyContent: 'space-between',
          backgroundColor: collapsed ? 'white' : '#F8F9FA',
          height: 'calc(100% - 1.25rem)',
          maxWidth: SCALES.FIXED_AREA_WIDTH,
          minWidth: SCALES.FIXED_AREA_WIDTH,
          borderRight: '1px solid #E0E2E7',
          outline: 'none',
          overflowY: 'auto',
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
