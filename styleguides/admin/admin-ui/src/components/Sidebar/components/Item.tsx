import React, { ReactNode } from 'react'
import { ButtonProps, Button } from '../../Button'

export interface SidebarItemProps extends ButtonProps {
  collapsed?: boolean
  selected?: boolean
  icon: ReactNode
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void
}

export function SidebarItem(props: SidebarItemProps) {
  const { icon, selected } = props

  return (
    <Button
      variant="tertiary"
      icon={icon}
      styleOverrides={{
        backgroundColor: selected ? '#EAF0FD' : 'unset',
        'div > svg': {
          color: selected ? 'unset' : 'black',
          opacity: selected ? 1 : 0.6,
        },
      }}
      {...props}
    />
  )
}
