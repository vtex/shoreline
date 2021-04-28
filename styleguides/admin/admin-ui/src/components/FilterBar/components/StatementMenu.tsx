import React from 'react'

import { Menu, MenuProps } from '../../Menu'
import { Button } from '../../Button'
import { IconAction } from '@vtex/admin-ui-icons'

export function StatementMenu(props: Omit<MenuProps, 'disclosure'>) {
  const { children, ...menuProps } = props

  return (
    <Menu
      {...menuProps}
      hideOnClick
      disclosure={
        <Button
          variant="adaptative-dark"
          csx={{ color: 'dark.secondary' }}
          icon={<IconAction />}
        />
      }
    >
      {children}
    </Menu>
  )
}
