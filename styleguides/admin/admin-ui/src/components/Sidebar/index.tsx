import React, { FunctionComponentElement, useState } from 'react'
import { Box } from '../Box'
import { SidebarCorner, SidebarCornerProps } from './components/Corner'
import { SidebarItem } from './components/Item'
import { SidebarSection } from './components/Section'
import { SidebarSubItem } from './components/SubItem'
import { SidebarProvider } from './context'
import { AnchorDirection } from './utils'

export interface SidebarProps {
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
  const { children, anchor } = useSidebar(props)

  return (
    <Box
      styles={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingY: '0.625rem',
        justifyContent: 'space-between',
        backgroundColor: collapsed ? 'white' : '#F8F9FA',
        height: 'calc(100% - 1.25rem)',
        width: '56px',
        borderRight: '1px solid #E0E2E7',
      }}
      role="navigation"
    >
      <SidebarProvider
        value={{
          direction: anchor,
          collapsed,
          setCollapsed,
        }}
      >
        {children}
      </SidebarProvider>
    </Box>
  )
}

Sidebar.Item = SidebarItem
Sidebar.Section = SidebarSection
Sidebar.SubItem = SidebarSubItem
Sidebar.Header = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'top'} />
)
Sidebar.Footer = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'bottom'} />
)
