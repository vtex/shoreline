import React, { ReactNode, useState } from 'react'
import { Box } from '../Box'
import { SidebarCorner, SidebarCornerProps } from './components/Corner'
import { SidebarItem } from './components/Item'
import { SidebarCurrentItem, SidebarProvider } from './context'

type AnchorDirection = 'left' | 'right'

export interface SidebarProps {
  children: ReactNode
  anchor?: AnchorDirection
}

// @ts-ignore
// This will be useful very soon... Wait for it
const oppositeDirection = {
  left: 'right',
  right: 'left',
}

function useSidebar(props: SidebarProps) {
  const { anchor = 'left' } = props

  return {
    anchor,
    ...props,
  }
}

export function Sidebar(props: SidebarProps) {
  const [currentItem, setCurrentItem] = useState<SidebarCurrentItem>({
    scope: 'top',
    index: 0,
  })
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
      <SidebarProvider
        value={{
          currentItem,
          setCurrentItem,
        }}
      >
        {children}
      </SidebarProvider>
    </Box>
  )
}

Sidebar.Item = SidebarItem
Sidebar.TopCorner = (props: Omit<SidebarCornerProps, 'scope'>) => (
  <SidebarCorner {...props} scope={'top'} />
)
Sidebar.BottomCorner = (props: Omit<SidebarCornerProps, 'scope'>) => (
  <SidebarCorner {...props} scope={'bottom'} />
)
