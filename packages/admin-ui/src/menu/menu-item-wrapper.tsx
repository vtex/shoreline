import React from 'react'
import type { ReactNode } from 'react'

import { disabledItemWrapper } from './menu.style'

export const MenuItemWrapper = (props: MenuItemWrapperProps) =>
  props.disabled ? (
    <div className={disabledItemWrapper}>{props.children}</div>
  ) : (
    <>{props.children}</>
  )

export type MenuItemWrapperProps = {
  disabled?: boolean
  children: ReactNode
}
