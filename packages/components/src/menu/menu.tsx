import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Menu as BaseMenu } from '@ariakit/react'

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  props,
  ref
) {
  const { children, asChild = false, ...otherProps } = props

  return (
    <BaseMenu
      data-sl-menu
      ref={ref}
      render={asChild && (children as any)}
      {...otherProps}
    >
      {children}
    </BaseMenu>
  )
})

export interface MenuProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}