import React, { forwardRef, Ref } from 'react'
import { Box } from '../Box'
import { SidebarItem, SidebarItemProps } from './components/Item'

type AnchorDirection = 'left' | 'right'

interface Corner {
  items: SidebarItemProps[]
  currentItemIndex: number
}

export interface SidebarProps {
  topCorner: Corner
  bottomCorner?: Corner
  anchor?: AnchorDirection
  onClick: (itemIndex: number) => void
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
  const { topCorner, bottomCorner, onClick } = useSidebar(props)

  const sidebar = [topCorner, bottomCorner]

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
      {sidebar.map((corner) => {
        if (!corner) {
          return <Box />
        }

        return (
          <Box>
            {corner.items.map((item, index) => (
              <SidebarItem
                key={index}
                {...item}
                selected={topCorner.currentItemIndex === index}
                onClick={(event) => {
                  item.onClick(event)
                  onClick(index)
                }}
              />
            ))}
          </Box>
        )
      })}
    </Box>
  )
}

Sidebar.Item = SidebarItem
