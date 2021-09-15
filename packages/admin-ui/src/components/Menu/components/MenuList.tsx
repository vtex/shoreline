import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { Menu as ReakitMenu } from 'reakit/Menu'
import { jsx } from '@vtex/admin-ui-react'
import { IconContainer } from '@vtex/admin-ui-icons'

import { useMenuContext } from './MenuContext'

export const MenuList = jsx(ReakitMenu)(
  {
    border: 0,
    outline: 'none',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    bg: 'light.primary',
    padding: 3,
    minWidth: 18,
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'mid.secondary',
    boxShadow: 'menu',
  },
  {
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
  }
)

export type MenuListProps = ComponentPropsWithRef<typeof MenuList>
