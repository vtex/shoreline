import type { SelectStore } from '@ariakit/react'
import { usePopoverContext, useSelectContext } from '@ariakit/react'
import { createContext, useContext } from 'react'

export const FilterContext = createContext<SelectStore | undefined>(undefined)

export function useFilterContext() {
  const filter = useContext(FilterContext)
  const select = useSelectContext()
  const popover = usePopoverContext()

  return {
    filter,
    select,
    popover,
  }
}
