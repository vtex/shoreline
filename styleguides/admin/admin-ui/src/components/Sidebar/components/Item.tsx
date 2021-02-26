import React, { ReactNode } from 'react'
import { ButtonProps, Button } from '../../Button'

export interface SidebarItemProps extends ButtonProps {
  icon: ReactNode
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void
  collapsed?: boolean
  selected?: boolean
}

export function SidebarItem(props: Omit<SidebarItemProps, 'secret'>) {
  const { icon, onClick, selected } = props

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
      onClick={(event) => {
        onClick(event)
      }}
    />
  )
}
