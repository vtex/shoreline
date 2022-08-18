import type { ReactNode } from 'react'
import React from 'react'
import {
  createComponent,
  useElement,
  IconContainer,
} from '@vtex/admin-ui-react'
import { MenuItem as AriakitMenuItem } from 'ariakit'

import { MenuItemWrapper } from './menu-item-wrapper'
import { Center } from '../center'

import * as style from './menu.style'

export const MenuItem = createComponent<
  typeof AriakitMenuItem,
  MenuItemOptions
>((props) => {
  const { icon, label, critical, disabled, onClick, ...itemProps } = props

  return useElement(MenuItemWrapper, {
    disabled,
    children: useElement(AriakitMenuItem, {
      disabled,
      onClick,
      ...itemProps,
      baseStyle: {
        ...style.item,
        ...style.itemVariants({
          variant:
            (disabled && 'disabled') || (critical && 'critical') || 'neutral',
        }),
      },
      children: (
        <Center>
          <IconContainer size="small">{icon}</IconContainer> {label}
        </Center>
      ),
    }),
  })
})

export type MenuItemOptions = {
  /**
   * Item icon
   */
  icon?: ReactNode
  /**
   * Whether the item variant is critical
   * @default false
   */
  critical?: boolean
  /**
   * Item label
   */
  label: ReactNode
  /**
   * Item click event
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export type MenuItemProps = React.ComponentPropsWithoutRef<typeof MenuItem>
