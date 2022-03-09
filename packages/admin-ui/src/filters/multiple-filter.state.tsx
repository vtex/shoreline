import type {
  FilterItem,
  UseMultipleFilterReturn,
  UseMultipleFilterStateProps,
} from './filter.state'
import { useFilterState } from './filter.state'

export function useMultipleFilterState<T extends FilterItem>(
  props: UseMultipleFilterStateProps<T>
): UseMultipleFilterReturn<T> {
  return useFilterState({ ...props, selectionMode: 'multiple' })
}
