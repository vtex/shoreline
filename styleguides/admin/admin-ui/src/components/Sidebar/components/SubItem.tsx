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
      size="small"
      styleOverrides={{
        width: '100%',
        backgroundColor: selected ? '#EAF0FD' : 'unset',
        '> div': {
          justifyContent: 'start',
          fontSize: '14px',
          color: selected ? 'blue' : '#707685',
        },
      }}
      {...props}
      onClick={(event) => {
        onClick(event)
      }}
    />
  )
}
