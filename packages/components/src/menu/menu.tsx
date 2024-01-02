import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { MenuPopover } from './menu-popover'
import { MenuProvider } from './menu-provider'
import { MenuTrigger } from './menu-trigger'
import type { ButtonProps } from '../button'
import { Button } from '../button'
import {
  IconCaretDownSmall,
  IconDotsThreeVertical,
} from '@vtex/shoreline-icons'
import { IconButton } from '../icon-button'

/**
 * Menu component
 * @example
 * <Menu label="Open">
 *  <MenuItem>Item 1</MenuItem>
 * </Menu>
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  props,
  ref
) {
  const {
    children,
    asChild = false,
    label,
    variant,
    type = 'menu',
    iconOnly,
    size,
    ...otherProps
  } = props

  const Icon = getIcon(type)

  return (
    <div data-sl-menu ref={ref} {...otherProps}>
      <MenuProvider>
        <MenuTrigger asChild>
          {iconOnly ? (
            <IconButton label={label} variant={variant} size={size}>
              {Icon}
            </IconButton>
          ) : (
            <Button variant={variant} size={size}>
              {type === 'actions' && Icon}
              {label}
              {type === 'menu' && Icon}
            </Button>
          )}
        </MenuTrigger>
        <MenuPopover>{children}</MenuPopover>
      </MenuProvider>
    </div>
  )
})

function getIcon(type: MenuProps['type'] = 'menu') {
  switch (type) {
    case 'menu':
      return <IconCaretDownSmall />

    case 'actions':
      return <IconDotsThreeVertical />

    default:
      return <IconCaretDownSmall />
  }
}

export interface MenuProps
  extends ComponentPropsWithoutRef<'div'>,
    Pick<ButtonProps, 'variant' | 'size'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Trigger label
   */
  label: ReactNode
  /**
   * Type of dropdown
   * @default 'menu'
   */
  type?: 'menu' | 'actions'
  /**
   * Hide the textual label
   * @default false
   */
  iconOnly?: boolean
}
