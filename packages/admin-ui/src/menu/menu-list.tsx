import React from 'react'
import { Menu as AriakitMenu } from 'ariakit/menu'
import {
  IconContainer,
  createComponent,
  useElement,
} from '@vtex/admin-ui-react'

import * as style from './menu.style'
import { useMenuContext } from './menu-context'

export const MenuList = createComponent<typeof AriakitMenu, MenuListProps>(
  (props) => {
    const { children, ...menuListProps } = props

    const { state } = useMenuContext()

    return useElement(AriakitMenu, {
      ...menuListProps,
      baseStyle: style.list,
      state,
      children: <IconContainer size="small">{children}</IconContainer>,
    })
  }
)

export type MenuListProps = any
