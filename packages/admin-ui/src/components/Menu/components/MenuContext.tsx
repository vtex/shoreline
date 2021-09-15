import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { MenuOptions } from './Menu'

export const MenuContext = createContext<MenuOptions | null>(null)

export function useMenuContext() {
  const context = useContext(MenuContext)

  invariant(context, 'Do not use Menu composites outside Menu context!')

  return context
}
