import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { MenuItem as BaseMenuItem } from '@ariakit/react'

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const { children, asChild = false, critical = false, ...otherProps } = props

    return (
      <BaseMenuItem
        data-sl-menu-item
        data-critical={critical}
        ref={ref}
        render={asChild && (children as any)}
        {...otherProps}
      >
        {children}
      </BaseMenuItem>
    )
  }
)

export interface MenuItemProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Wether is critical
   * @default false
   */
  critical?: boolean
}
