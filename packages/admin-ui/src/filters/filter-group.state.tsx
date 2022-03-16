import type { GenericFilterStateReturn } from './base-filter.state'

export function useFilterGroupState(props: UseFilterGroupStateReturn) {
  const { filterStates } = props

  const onClear = () => {
    filterStates.forEach((state) => state.onClear())
  }

  return { onClear }
}

interface UseFilterGroupStateReturn {
  filterStates: GenericFilterStateReturn[]
}
