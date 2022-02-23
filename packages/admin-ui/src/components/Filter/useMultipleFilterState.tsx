import type {
  FilterItem,
  UseMultipleFilterReturn,
  UseMultipleFilterStateProps,
} from './useFilterState'
import { useFilterState } from './useFilterState'

export function useMultipleFilterState<T extends FilterItem>(
  props: UseMultipleFilterStateProps<T>
): UseMultipleFilterReturn<T> {
  return useFilterState({ ...props, selectionMode: 'multiple' })
}
