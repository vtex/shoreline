import React, { cloneElement, forwardRef, ReactNode, Ref } from 'react'
import { ReakitMenuButton } from '.'
import { ButtonProps, Button } from '../../Button'
import { SidebarSecretProps } from '../utils'
import { Tooltip } from '../../Tooltip'
import { useSidebarContext } from '../context'

export interface SidebarDisclosureProps
  extends ButtonProps,
    SidebarSecretProps {
  icon: ReactNode
  label: string
  onClick: (event?: React.MouseEvent<any, MouseEvent>) => void
  selected?: boolean
}

export const SidebarDisclosure = forwardRef(function SidebarDisclosure(
  props: SidebarDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    icon,
    selected,
    label,
    secret: { state },
  } = props

  const { direction } = useSidebarContext()

  const child = (
    <Button
      variant="tertiary"
      icon={icon}
      styleOverrides={{
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
      }}
      {...props}
    />
  )

  return (
    <ReakitMenuButton ref={ref} {...state} {...child.props}>
      {(enhancedProps) => (
        <Tooltip label={label} placement={direction} styleOverrides={{}}>
          {cloneElement(child, enhancedProps)}
        </Tooltip>
      )}
    </ReakitMenuButton>
  )
})
