import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { MenuItem as AriakitMenuItem } from 'ariakit/Menu'

import { Center } from '../center'

import * as style from './menu.style'

export const MenuItem = createComponent<
  typeof AriakitMenuItem,
  MenuItemOptions
>((props) => {
  const { children, onClick, icon, critical, disabled, ...buttonProps } = props

  return useElement(AriakitMenuItem, {
    disabled,
    ...buttonProps,
    baseStyle: {
      ...style.item,
      ...style.itemVariants({
        variant:
          (disabled && 'disabled') || (critical && 'critical') || 'neutral',
      }),
    },
    children: (
      <Center>
        {icon} {children}
      </Center>
    ),
  })
})

export type MenuItemOptions = {
  icon?: ReactNode
  critical?: boolean
  children: ReactNode
}

export type MenuItemProps = ComponentPropsWithRef<typeof MenuItem>
