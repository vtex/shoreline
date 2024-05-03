import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { MenuButton, useMenuContext } from '@ariakit/react'
import { invariant } from '@vtex/shoreline-utils'

/**
 * Menu's trigger action
 */
export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  function MenuTrigger(props, ref) {
    const { children, asChild = false, ...otherProps } = props

    const store = useMenuContext()

    invariant(store, 'You must use MenuTrigger under the MenuProvider context.')

    const open = store.useState('open')

    return (
      <MenuButton
        ref={ref}
        data-sl-menu-trigger
        render={asChild && (children as any)}
        data-active={open}
        {...otherProps}
      >
        {children}
      </MenuButton>
    )
  }
)

export interface MenuTriggerOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type MenuTriggerProps = MenuTriggerOptions &
  ComponentPropsWithoutRef<'button'>
