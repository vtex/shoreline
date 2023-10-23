import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { MenuButton } from '@ariakit/react'

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  function MenuTrigger(props, ref) {
    const { children, asChild = false, ...otherProps } = props

    return (
      <MenuButton
        ref={ref}
        data-sl-menu-trigger
        render={asChild && (children as any)}
        {...otherProps}
      >
        {children}
      </MenuButton>
    )
  }
)

interface MenuTriggerProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}
