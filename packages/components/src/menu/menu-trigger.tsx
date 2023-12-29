import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { MenuButton, useMenuContext } from '@ariakit/react'
import { invariant } from '@vtex/shoreline-utils'

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

interface MenuTriggerProps extends ComponentPropsWithoutRef<'button'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}
