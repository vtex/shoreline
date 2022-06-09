import React from 'react'
import { Menu as AriakitMenu } from 'ariakit/menu'
import {
  IconContainer,
  createComponent,
  useElement,
} from '@vtex/admin-ui-react'

import * as style from './menu.style'

export const Menu = createComponent<typeof AriakitMenu, MenuListProps>(
  (props) => {
    const { children, ...menuListProps } = props

    return useElement(AriakitMenu, {
      ...menuListProps,
      baseStyle: style.list,
      children: <IconContainer size="small">{children}</IconContainer>,
    })
  }
)

export type MenuListProps = any
