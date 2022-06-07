import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
import { MenuProvider } from './menu-context'
import type { MenuState } from 'ariakit'

export function Menu(props: MenuOptions) {
  const { children, ...remainingProps } = props

  return <MenuProvider {...remainingProps}>{children}</MenuProvider>
}

export interface MenuOptions {
  /**
   * If menu should be hidden when an item is clicked
   * @default false
   */
  hideOnClick?: boolean
  /**
   * Return of ariakit's useMenuState
   */
  state: MenuState
  children?: ReactNode
}

export type MenuProps = ComponentPropsWithRef<typeof Menu>
