import React, { forwardRef, ReactNode, Ref } from 'react'
import { ButtonProps, Button } from '../../Button'

export interface SidebarSubItemProps extends ButtonProps {
  children: ReactNode
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void
  selected?: boolean
}

export const SidebarSubItem = forwardRef(function SidebarSubItem(
  props: Omit<SidebarSubItemProps, 'secret'>,
  ref: Ref<HTMLButtonElement>
) {
  const { onClick, selected } = props

  return (
    <Button
      ref={ref}
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
})
