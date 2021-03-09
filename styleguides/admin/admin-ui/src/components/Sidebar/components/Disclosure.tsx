import React, { forwardRef, ReactNode, Ref } from 'react'
import { StyleObject } from '@vtex/admin-styles'
import { ButtonProps, Button } from '../../Button'
import { Tooltip } from '../../Tooltip'
import { useSidebarContext } from '../context'

export interface SidebarDisclosureProps extends ButtonProps {
  icon: ReactNode
  label: string
  onClick: (event?: React.MouseEvent<any, MouseEvent>) => void
  selected?: boolean
}

export const SidebarDisclosure = forwardRef(function SidebarDisclosure(
  props: SidebarDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const { icon, selected, label, ...buttonProps } = props
  const { direction } = useSidebarContext()

  const styleOverrides: StyleObject = {
    backgroundColor: selected ? 'blue.secondary' : 'unset',
    'div > svg': {
      color: selected ? 'unset' : 'sidebar.dark',
    },
    '&:hover, &:focus': {
      backgroundColor: selected ? 'blue.secondary' : '#EAF0FD',
      'div > svg': {
        color: 'blue',
        opacity: 1,
      },
    },
  }

  return (
    <Tooltip label={label} placement={direction}>
      <Button
        ref={ref}
        variant="tertiary"
        icon={icon}
        styleOverrides={styleOverrides}
        {...buttonProps}
      />
    </Tooltip>
  )
})
