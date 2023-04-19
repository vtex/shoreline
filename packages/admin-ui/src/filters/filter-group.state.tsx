import { useMemo } from 'react'
import type { GenericFilterStateReturn } from './filter/filter.state'

export function useFilterGroupState(props: UseFilterGroupStateReturn) {
  const { filterStates, onClear: onClearCb } = props

  const hasFilterApplied = useMemo(
    () => filterStates.some((filterState) => filterState.hasFilterValueApplied),
    [filterStates]
  )

  const onClear = () => {
    filterStates.forEach((state) => state.onClear())
    onClearCb?.()
  }

  return { onClear, hasFilterApplied }
}

interface UseFilterGroupStateReturn {
  filterStates: Array<GenericFilterStateReturn<any>>
  onClear?: () => void
}
