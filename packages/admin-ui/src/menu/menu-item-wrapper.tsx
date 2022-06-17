import React from 'react'
import type { ReactNode } from 'react'
import { tag } from '@vtex/admin-ui-react'

import * as style from './menu.style'

export const MenuItemWrapper = (props: MenuItemWrapperProps) =>
  props.disabled ? (
    <tag.div csx={style.disabledItemWrapper}>{props.children}</tag.div>
  ) : (
    <>{props.children}</>
  )

export type MenuItemWrapperProps = {
  disabled?: boolean
  children: ReactNode
}
