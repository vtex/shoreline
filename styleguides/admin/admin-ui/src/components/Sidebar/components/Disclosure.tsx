import React, { cloneElement, forwardRef, ReactNode, Ref } from 'react'
import { ReakitMenuButton } from './AriaSidebar'
import { ButtonProps, Button } from '../../Button'
import { SidebarSecretProps } from '../utils'

export interface SidebarDisclosureProps
  extends ButtonProps,
    SidebarSecretProps {
  icon: ReactNode
  onClick: (event: React.MouseEvent<any, MouseEvent>) => void
  selected?: boolean
}

export const SidebarDisclosure = forwardRef(function SidebarDisclosure(
  props: SidebarDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    icon,
    onClick,
    selected,
    secret: { state },
  } = props

  const children = (
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

  return (
    <ReakitMenuButton ref={ref} {...state} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </ReakitMenuButton>
  )
})
