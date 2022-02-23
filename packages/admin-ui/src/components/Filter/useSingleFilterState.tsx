import type { FilterItem, key, UseFilterStateReturn } from './useFilterState'
import { useFilterState } from './useFilterState'

export function useSingleFilterState<T extends FilterItem>(
  props: UseSingleFilterStateProps<T>
): UseSingleFilterReturn<T> {
  const { initialSelected, onChange: onChangeCb, ...otherProps } = props

  const onChange = ({ selected }: { selected: key[] }) => {
    onChangeCb({ selected: selected?.length ? selected[0] : null })
  }

  const filterState = useFilterState({
    ...otherProps,
    initialSelected: initialSelected ? [initialSelected] : [],
    onChange,
    selectionMode: 'single',
  })

  const { selectedValues, ...singleSelectState } = filterState

  return {
    ...singleSelectState,
    selectedValue: selectedValues?.length ? selectedValues[0] : null,
  }
}

export interface UseSingleFilterReturn<T extends FilterItem>
  extends UseFilterStateReturn<T> {
  selectedValue: any
}

export interface UseSingleFilterStateProps<T extends FilterItem> {
  /** Function called when a change is applied. */
  onChange: ({ selected }: { selected: key | null }) => void
  /** The initial selected key. */
  initialSelected?: key
  /** Filter button label. */
  label: string
  items: T[]
}
