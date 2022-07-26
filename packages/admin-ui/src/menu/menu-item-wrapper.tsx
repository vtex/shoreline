import React from 'react'
import type { ReactNode } from 'react'

import { Box } from '../box'
import * as style from './menu.style'

export const MenuItemWrapper = (props: MenuItemWrapperProps) =>
  props.disabled ? (
    <Box csx={style.disabledItemWrapper}>{props.children}</Box>
  ) : (
    <>{props.children}</>
  )

export type MenuItemWrapperProps = {
  disabled?: boolean
  children: ReactNode
}
