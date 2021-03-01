import React, { cloneElement, FunctionComponentElement, useState } from 'react'
import { useSystem } from '@vtex/admin-core'
import { SystemComponent } from '../../types'
import { ReakitMenuBar, useMenuBarState } from './components/AriaSidebar'
import { SidebarCorner, SidebarCornerProps } from './components/Corner'
import { SidebarItem } from './components/Item'
import { SidebarSection } from './components/Section'
import { SidebarSubItem } from './components/SubItem'
import { SidebarProvider } from './context'
import { AnchorDirection } from './utils'

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

export function Sidebar(props: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const { children, anchor, ...baseProps } = useSidebar(props)
  const { cn } = useSystem()
  const state = useMenuBarState({
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
          width: '56px',
          borderRight: '1px solid #E0E2E7',
          outline: 'none',
        })}
      >
        {children.map((child) =>
          cloneElement(child, {
            // @ts-ignore
            secret: { state },
          })
        )}
      </ReakitMenuBar>
    </SidebarProvider>
  )
}

/**
 * Sidebar.Item corresponds to an item of the sidebar's
 * first level. It must used along with the Sidebar.Header
 * or Sidebar.Footer, both inside the Sidebar. That is because
 * they share the same context, and to enforce the proper
 * usage of this component.
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

Sidebar.Section = SidebarSection
Sidebar.SubItem = SidebarSubItem
Sidebar.Header = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'top'} />
)
Sidebar.Footer = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'bottom'} />
)
