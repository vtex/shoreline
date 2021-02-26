import React, { ReactNode } from 'react'
import { Box } from '../Box'
import { SidebarCorner, SidebarCornerProps } from './components/Corner'
import { SidebarItem } from './components/Item'

type AnchorDirection = 'left' | 'right'

export interface SidebarProps {
  children: ReactNode
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
  const { children } = useSidebar(props)

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
      {children}
    </Box>
  )
}

Sidebar.Item = SidebarItem
Sidebar.Header = (props: Omit<SidebarCornerProps, 'scope'>) => (
  <SidebarCorner {...props} scope={'top'} />
)
Sidebar.Footer = (props: Omit<SidebarCornerProps, 'scope'>) => (
  <SidebarCorner {...props} scope={'bottom'} />
)
