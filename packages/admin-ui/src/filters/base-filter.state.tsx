import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { Item } from '@react-stately/collections'
import { useListBox } from '@react-aria/listbox'
import type { ListState } from '@react-stately/list'
import { useListState } from '@react-stately/list'

import type { PickerStateReturn } from '../picker'
import { usePickerState } from '../picker'

export function useBaseFilterState(
  props: UseBaseFilterStateProps
): UseFilterMultipleReturn {
  const {
    items,
    label,
    initialApplied,
    selectionMode,
    onChange = () => {},
  } = props

  const stateProps = {
    items,
    children: (item: FilterItem) => <Item key={item.id}>{item.label}</Item>,
    selectionMode,
  }

  const [appliedKeys, setAppliedKeys] = useState<Key[]>(initialApplied || [])

  const ref = useRef(null)

  const popover = usePickerState({
    placement: 'bottom-start',
    baseId: 'filter-picker',
  })

  const listState = useListState<FilterItem>({
    ...stateProps,
    defaultSelectedKeys: initialApplied,
  })

  const { listBoxProps, labelProps } = useListBox<FilterItem>(
    { ...stateProps, 'aria-label': label },
    listState,
    ref
  )

  const apply = useCallback(() => {
    const nextSelected = Array.from(
      listState.selectionManager.selectedKeys.values()
    )

    setAppliedKeys(nextSelected)
    onChange({ selected: nextSelected })
    popover.hide()
  }, [onChange])

  const clear = useCallback(() => {
    listState.selectionManager.clearSelection()
    setAppliedKeys([])

    onChange({ selected: [] })
    popover.hide()
  }, [onChange])

  useEffect(() => {
    if (!popover.visible) {
      listState.selectionManager.setSelectedKeys(appliedKeys)
      listState.selectionManager.setFocusedKey(items[0].id)
    }
  }, [popover.visible])

  const appliedItems = useMemo(
    () => appliedKeys.map((k) => listState.collection.getItem(k).value),
    [appliedKeys, listState.collection]
  )

  return {
    popover,
    onClear: clear,
    onChange: apply,
    listState,
    appliedItems,
    appliedKeys,
    selectedKeys: Array.from(listState.selectionManager.selectedKeys.values()),
    ref,
    listBoxProps,
    label,
    labelProps,
  }
}

export type Key = string | number

export interface FilterItem {
  id: Key
  label: string
  [x: string]: unknown
}

export interface GenericFilterStateReturn {
  popover: PickerStateReturn
  onClear: () => void
  onChange: () => void
  ref: React.MutableRefObject<any>
  listBoxProps: React.HTMLAttributes<HTMLElement>
  labelProps: React.HTMLAttributes<HTMLElement>
  listState: ListState<FilterItem>
  label: string
}

export interface UseFilterMultipleReturn extends GenericFilterStateReturn {
  appliedItems: FilterItem[]
  appliedKeys: Key[]
  selectedKeys: Key[]
}

export interface UseFilterMultipleStateProps {
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: Key[] }) => void
  /** The initial selected keys. */
  initialApplied?: Key[]
  /** Filter button label. */
  label: string
  items: FilterItem[]
}

export interface UseBaseFilterStateProps extends UseFilterMultipleStateProps {
  /** set to multiple if filter is multiselect. */
  selectionMode: 'multiple' | 'single'
}
