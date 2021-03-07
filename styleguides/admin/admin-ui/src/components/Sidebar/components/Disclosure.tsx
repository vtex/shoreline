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
  const { icon, selected, label } = props

  const { direction } = useSidebarContext()

  const styleOverrides: StyleObject = {
    backgroundColor: selected ? '#EAF0FD' : 'unset',
    'div > svg': {
      color: selected ? 'unset' : 'black',
      opacity: selected ? 1 : 0.6,
    },
    '&:hover, &:focus': {
      backgroundColor: selected ? '#EAF0FD' : 'unset',
      'div > svg': {
        color: '#2A53B2',
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
        {...props}
      />
    </Tooltip>
  )
})
