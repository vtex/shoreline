import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { Menu } from '@ariakit/react'

/**
 * Menu's Popover Box
 * @example
 */
export const MenuPopover = forwardRef<HTMLDivElement, MenuPopoverProps>(
  function MenuPopover(props, ref) {
    const { children, asChild = false, portal = true, ...otherProps } = props

    return (
      <Menu
        data-sl-menu-popover
        ref={ref}
        render={asChild && (children as any)}
        gutter={4}
        portal={portal}
        {...otherProps}
      >
        {children}
      </Menu>
    )
  }
)

export interface MenuPopoverOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Should activate portal
   * @default true
   */
  portal?: boolean
}

export type MenuPopoverProps = MenuPopoverOptions &
  ComponentPropsWithoutRef<'div'>
