import type { SelectStore } from '@ariakit/react'

import { createContext, useContext } from 'react'

export const FilterContext = createContext<SelectStore | undefined>(undefined)

export function useFilterContext() {
  return useContext(FilterContext)
}
