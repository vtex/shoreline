import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Menu } from '@ariakit/react'

/**
 * Menu's Popover Box
 * @example
 */
export const MenuPopover = forwardRef<HTMLDivElement, MenuPopoverProps>(
  function MenuPopover(props, ref) {
    const { children, asChild = false, ...otherProps } = props

    return (
      <Menu
        data-sl-menu-popover
        ref={ref}
        render={asChild && (children as any)}
        gutter={4}
        portal
        {...otherProps}
      >
        {children}
      </Menu>
    )
  }
)

export interface MenuPopoverProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}
