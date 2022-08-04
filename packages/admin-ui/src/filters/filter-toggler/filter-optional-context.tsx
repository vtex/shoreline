import type { MenuState } from 'ariakit'
import React from 'react'

const FilterOptionalContext = React.createContext<{
  setMenuState?: (menu: MenuState<any> | null) => void
} | null>(null)

export function useFilterOptionalContext() {
  const context = React.useContext(FilterOptionalContext)

  return context || {}
}

const { Provider } = FilterOptionalContext

export { Provider as FilterOptionalProvider }
