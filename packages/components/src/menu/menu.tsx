import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Menu as BaseMenu } from '@ariakit/react'
import './menu.css'

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
      gutter={4}
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
