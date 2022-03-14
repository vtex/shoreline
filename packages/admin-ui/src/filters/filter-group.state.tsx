import type { UseFilterStateReturn } from './filter.state'

export function useFilterGroupState(props: UseFilterStateReturn[]) {
  const onClear = () => {
    props?.forEach((state) => state.onClear())
  }

  return { onClear }
}
