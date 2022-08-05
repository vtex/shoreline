import React from 'react'

const FilterOptionalContext = React.createContext<{
  shouldOpenOnMount?: () => boolean
} | null>(null)

export function useFilterOptionalContext() {
  const context = React.useContext(FilterOptionalContext)

  return context || {}
}

const { Provider } = FilterOptionalContext

export { Provider as FilterOptionalProvider }
