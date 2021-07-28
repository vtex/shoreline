import React from 'react'
import { IconAction } from '@vtex/admin-ui-icons'

import type { MenuProps } from '../../Menu'
import { Menu } from '../../Menu'
import { Button } from '../../Button'

export function StatementMenu(props: Omit<MenuProps, 'disclosure'>) {
  const { children, ...menuProps } = props

  return (
    <Menu
      {...menuProps}
      hideOnClick
      disclosure={
        <Button
          aria-label={menuProps['aria-label']}
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
