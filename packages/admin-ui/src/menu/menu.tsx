import React from 'react'
import { Menu as AriakitMenu } from 'ariakit/menu'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './menu.style'
import { Box } from '../box'

export const Menu = createComponent<typeof AriakitMenu>((props) => {
  const { children, ...menuProps } = props

  return useElement(AriakitMenu, {
    ...menuProps,
    baseStyle: style.popoverContainer,
    children: <Box csx={style.popoverChildren}>{children}</Box>,
  })
})

export type MenuProps = React.ComponentPropsWithoutRef<typeof Menu>
