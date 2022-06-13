import React from 'react'
import { Menu as AriakitMenu } from 'ariakit/menu'
import {
  IconContainer,
  createComponent,
  useElement,
} from '@vtex/admin-ui-react'

import * as style from './menu.style'

export const Menu = createComponent<typeof AriakitMenu>((props) => {
  const { children, ...menuProps } = props

  return useElement(AriakitMenu, {
    ...menuProps,
    baseStyle: style.list,
    children: <IconContainer size="small">{children}</IconContainer>,
  })
})

export type MenuProps = React.ComponentPropsWithoutRef<typeof Menu>
