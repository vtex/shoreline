import type { SelectStore } from '@ariakit/react'
import { createContext, useContext } from 'react'

export const FilterContext = createContext<SelectStore<any> | undefined>(
  undefined
)

/**
 * Recovers the filter store
 * @example
 * const filter = useFilterContext()
 */
export function useFilterContext() {
  return useContext(FilterContext)
}
