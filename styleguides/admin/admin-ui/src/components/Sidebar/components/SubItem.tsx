import React, { ReactNode } from 'react'
import { ButtonProps, Button } from '../../Button'

export interface SidebarSubItemProps extends ButtonProps {
  children: ReactNode
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void
  selected?: boolean
}

export function SidebarSubItem(props: Omit<SidebarSubItemProps, 'secret'>) {
  const { onClick, selected } = props

  return (
    <Button
      variant="tertiary"
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
