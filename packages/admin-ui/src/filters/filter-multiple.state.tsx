import type {
  UseFilterMultipleReturn,
  UseFilterMultipleStateProps,
} from './base-filter.state'
import { useBaseFilterState } from './base-filter.state'

export function useFilterMultipleState(
  props: UseFilterMultipleStateProps
): UseFilterMultipleReturn {
  return useBaseFilterState({ ...props, selectionMode: 'multiple' })
}
