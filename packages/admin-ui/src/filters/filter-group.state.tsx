import type { GenericFilterStateReturn } from './filter/filter.state'

export function useFilterGroupState(props: UseFilterGroupStateReturn) {
  const { filterStates, onClear: onClearCb } = props

  const onClear = () => {
    filterStates.forEach((state) => state.onClear())
    onClearCb?.()
  }

  return { onClear }
}

interface UseFilterGroupStateReturn {
  filterStates: Array<GenericFilterStateReturn<any>>
  onClear?: () => void
}
