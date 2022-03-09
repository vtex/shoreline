import type { FilterItem, UseFilterStateReturn } from './filter.state'

export function useFilterGroupState<T extends FilterItem>(
  props: Array<UseFilterStateReturn<T>>
) {
  const onClear = () => {
    props?.forEach((state) => state.onClear())
  }

  return { onClear }
}
