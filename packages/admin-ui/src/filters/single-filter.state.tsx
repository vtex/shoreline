import { useEffect } from 'react'
import type { FilterItem, Key, UseFilterStateReturn } from './filter.state'
import { useFilterState } from './filter.state'

export function useSingleFilterState<T extends FilterItem>(
  props: UseSingleFilterStateProps<T>
): UseSingleFilterReturn<T> {
  const { initialApplied, onChange: onChangeCb, ...otherProps } = props

  const onChange = ({ selected }: { selected: Key[] }) => {
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
  appliedKey: Key | null
}

export interface UseSingleFilterStateProps<T extends FilterItem> {
  /** Function called when a change is applied. */
  onChange: ({ selected }: { selected: Key | null }) => void
  /** The initial selected key. */
  initialApplied?: Key
  /** Filter button label. */
  label: string
  items: T[]
}
