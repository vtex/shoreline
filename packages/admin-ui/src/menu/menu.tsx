import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { MenuState } from 'ariakit/menu'
import { Menu as AriakitMenu } from 'ariakit/menu'

import { popoverChildrenTheme, popoverContainerTheme } from './menu.css'
import { cx } from '@vtex/admin-ui-core'

export const Menu = forwardRef((props: MenuProps, ref: Ref<HTMLDivElement>) => {
  const { children, className = '', ...menuProps } = props

  return (
    <AriakitMenu
      className={cx(popoverContainerTheme, className)}
      ref={ref}
      {...menuProps}
    >
      <div className={popoverChildrenTheme}>{children}</div>
    </AriakitMenu>
  )
})

export interface MenuProps extends ComponentPropsWithoutRef<'div'> {
  state: MenuState
}
