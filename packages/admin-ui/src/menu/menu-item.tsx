import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { MenuItem as AriakitMenuItem } from 'ariakit/menu'
import { cx } from '@vtex/admin-ui-core'

import { MenuItemWrapper } from './menu-item-wrapper'
import { Center } from '../center'
import { itemTheme } from './menu.style'
import { IconContainer } from '../icons'

export const MenuItem = forwardRef(
  (props: MenuItemProps, ref: Ref<HTMLDivElement>) => {
    const {
      icon,
      label,
      critical,
      disabled,
      onClick,
      className = '',
      ...itemProps
    } = props

    const variant =
      (disabled && 'disabled') || (critical && 'critical') || 'neutral'

    return (
      <MenuItemWrapper disabled={disabled}>
        <AriakitMenuItem
          disabled={disabled}
          ref={ref}
          onClick={onClick}
          data-variant={variant}
          className={cx(itemTheme, className)}
          {...itemProps}
        >
          <Center>
            <IconContainer size="small">{icon}</IconContainer> {label}
          </Center>
        </AriakitMenuItem>
      </MenuItemWrapper>
    )
  }
)

export interface MenuItemProps extends React.ComponentPropsWithoutRef<'div'> {
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
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean
}
