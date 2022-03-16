import { useEffect } from 'react'
import type {
  FilterItem,
  Key,
  GenericFilterStateReturn,
} from './base-filter.state'
import { useBaseFilterState } from './base-filter.state'

export function useFilterState(props: UseFilterStateProps): UseFilterReturn {
  const {
    initialApplied,
    onChange: onChangeCb = () => {},
    ...otherProps
  } = props

  const onChange = ({ selected }: { selected: Key[] }) => {
    onChangeCb({ selected: selected?.length ? selected[0] : null })
  }

  const filterState = useBaseFilterState({
    ...otherProps,
    initialApplied: initialApplied ? [initialApplied] : [],
    onChange,
    selectionMode: 'single',
  })

  const {
    selectedKeys,
    appliedKeys = [],
    appliedItems = [],
    ...singleSelectState
  } = filterState

  // forces apply when one item is selected
  useEffect(() => {
    filterState.onChange()
  }, [selectedKeys[0]])

  return {
    ...singleSelectState,
    appliedItem: appliedItems[0] ?? null,
    appliedKey: appliedKeys[0] ?? null,
  }
}

export interface UseFilterReturn extends GenericFilterStateReturn {
  appliedItem: FilterItem | null
  appliedKey: Key | null
}

export interface UseFilterStateProps {
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: Key | null }) => void
  /** The initial selected key. */
  initialApplied?: Key
  /** Filter button label. */
  label: string
  items: FilterItem[]
}
