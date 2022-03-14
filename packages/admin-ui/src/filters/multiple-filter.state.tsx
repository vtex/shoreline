import type {
  UseMultipleFilterReturn,
  UseMultipleFilterStateProps,
} from './filter.state'
import { useFilterState } from './filter.state'

export function useMultipleFilterState(
  props: UseMultipleFilterStateProps
): UseMultipleFilterReturn {
  return useFilterState({ ...props, selectionMode: 'multiple' })
}
