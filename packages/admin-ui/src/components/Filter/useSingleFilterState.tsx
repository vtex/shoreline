import { useEffect } from 'react'
import type { FilterItem, key, UseFilterStateReturn } from './useFilterState'
import { useFilterState } from './useFilterState'

export function useSingleFilterState<T extends FilterItem>(
  props: UseSingleFilterStateProps<T>
): UseSingleFilterReturn<T> {
  const { initialApplied, onChange: onChangeCb, ...otherProps } = props

  const onChange = ({ selected }: { selected: key[] }) => {
    onChangeCb({ selected: selected?.length ? selected[0] : null })
  }

  const filterState = useFilterState({
    ...otherProps,
    initialApplied: initialApplied ? [initialApplied] : [],
    onChange,
    selectionMode: 'single',
  })

  const { appliedValues, appliedKeys, selectedKeys, ...singleSelectState } =
    filterState

  // forces apply when one item is selected
  useEffect(() => {
    filterState.onChange()
  }, [selectedKeys[0]])

  return {
    ...singleSelectState,
    appliedValue: appliedValues?.length ? appliedValues[0] : null,
    appliedKey: appliedKeys?.length ? appliedKeys[0] : null,
  }
}

export interface UseSingleFilterReturn<T extends FilterItem>
  extends UseFilterStateReturn<T> {
  appliedValue: any
  appliedKey: any
}

export interface UseSingleFilterStateProps<T extends FilterItem> {
  /** Function called when a change is applied. */
  onChange: ({ selected }: { selected: key | null }) => void
  /** The initial selected key. */
  initialApplied?: key
  /** Filter button label. */
  label: string
  items: T[]
}
