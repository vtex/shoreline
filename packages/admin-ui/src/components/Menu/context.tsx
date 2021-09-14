import React, { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { MenuOptions } from './components/Menu'

const MenuContext = createContext<MenuOptions | null>(null)

export function useMenuContext() {
  const context = useContext(MenuContext)

  invariant(context, 'Do not use Menu composites outside Menu context!')

  return context
}

export function MenuProvider(props: React.PropsWithChildren<MenuOptions>) {
  const { children, ...menuProps } = props

  return (
    <MenuContext.Provider value={menuProps}>{children}</MenuContext.Provider>
  )
}
