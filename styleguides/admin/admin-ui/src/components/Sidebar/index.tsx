import React, { FunctionComponentElement } from 'react'
import { Box } from '../Box'
import { SidebarCorner, SidebarCornerProps } from './components/Corner'
import { SidebarItem } from './components/Item'
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
  const { children, anchor } = useSidebar(props)

  return (
    <Box
      styles={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: '56px',
        borderRight: '1px solid #E0E2E7',
      }}
      role="navigation"
    >
      <SidebarProvider
        value={{
          direction: anchor,
        }}
      >
        {children}
      </SidebarProvider>
    </Box>
  )
}

Sidebar.Item = SidebarItem
Sidebar.SubItem = SidebarSubItem
Sidebar.Header = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'top'} />
)
Sidebar.Footer = (props: Omit<SidebarCornerProps, 'scope' | 'secret'>) => (
  <SidebarCorner {...props} scope={'bottom'} />
)
