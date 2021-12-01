import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { Menu as ReakitMenu } from 'reakit/Menu'
import { jsx, IconContainer } from '@vtex/admin-ui-react'

import * as style from '../Menu.style'
import { useMenuContext } from './MenuContext'

export const MenuList = jsx(ReakitMenu)(style.list, {
  options: [],
  useOptions(_, props) {
    const { children, ...menuListProps } = props

    const { state } = useMenuContext()

    return {
      ...menuListProps,
      state,
      children: <IconContainer space="small">{children}</IconContainer>,
    }
  },
})

export type MenuListProps = ComponentPropsWithRef<typeof MenuList>
