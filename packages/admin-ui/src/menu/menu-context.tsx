import React, { createContext, useContext } from 'react'

import invariant from 'tiny-invariant'
import type { MenuProps } from '.'

export const MenuContext = createContext<MenuProps | null>(null)

export function useMenuContext() {
  const context = useContext(MenuContext)

  invariant(context, 'Do not use Menu composites outside Menu context!')

  return context
}

export function MenuProvider(props: MenuProps) {
  const { children, ...menuProps } = props

  return (
    <MenuContext.Provider value={menuProps}>{children}</MenuContext.Provider>
  )
}
