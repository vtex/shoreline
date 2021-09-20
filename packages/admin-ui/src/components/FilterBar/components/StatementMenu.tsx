import React from 'react'
import type { MenuProps } from '../../Menu'
import { useMenuState, Menu } from '../../Menu'

export function StatementMenu(props: Omit<MenuProps, 'state'>) {
  const { children, ...menuProps } = props

  const state = useMenuState({ baseId: 'statement-menu' })

  return (
    <Menu {...menuProps} state={state} hideOnClick>
      {children}
    </Menu>
  )
}
