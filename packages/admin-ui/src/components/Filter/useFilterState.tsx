import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { Item } from '@react-stately/collections'
import { useListBox } from '@react-aria/listbox'
import type { ListState } from '@react-stately/list'
import { useListState } from '@react-stately/list'

import type { PickerStateReturn } from '../../picker'
import { usePickerState } from '../../picker'

export function useFilterState<T extends FilterItem>(
  props: UseFilterStateProps<T>
): UseMultipleFilterReturn<T> {
  const { onChange, items, label, initialSelected, selectionMode } = props
  const stateProps = {
    items,
    children: (item: FilterItem) => <Item key={item.id}>{item.label}</Item>,
    selectionMode,
  }

  const [selectedKeys, setSelectedKeys] = useState<key[]>(initialSelected || [])

  const ref = useRef(null)

  const popover = usePickerState({ placement: 'bottom-start' })

  const listState = useListState<T>({
    ...stateProps,
    defaultSelectedKeys: initialSelected,
  })

  const { listBoxProps, labelProps } = useListBox<FilterItem>(
    { ...stateProps, 'aria-label': label },
    listState,
    ref
  )

  const apply = useCallback(() => {
    const nextSelected = [...listState.selectionManager.selectedKeys]

    setSelectedKeys(nextSelected)
    onChange?.({ selected: nextSelected })
    popover.hide()
  }, [onChange])

  const clear = useCallback(() => {
    listState.selectionManager.clearSelection()
    setSelectedKeys([])

    onChange?.({ selected: [] })
    popover.hide()
  }, [onChange])

  useEffect(() => {
    if (!popover.visible) {
      listState.selectionManager.setSelectedKeys(selectedKeys)
      listState.selectionManager.setFocusedKey(items[0].id)
    }
  }, [popover.visible])

  const selectedValues = useMemo(
    () => selectedKeys.map((k) => listState.collection.getItem(k).value.label),
    [selectedKeys, listState.collection]
  )

  return {
    popover,
    onClear: clear,
    onChange: apply,
    listState,
    selectedValues,
    ref,
    listBoxProps,
    label,
    labelProps,
  }
}

export type key = string | number

export interface FilterItem {
  id: key
  label: string
  value: any
}

export interface UseFilterStateReturn<T extends FilterItem> {
  popover: PickerStateReturn
  onClear: () => void
  onChange: () => void
  ref: React.MutableRefObject<any>
  listBoxProps: React.HTMLAttributes<HTMLElement>
  labelProps: React.HTMLAttributes<HTMLElement>
  listState: ListState<T>
  label: string
}

export interface UseMultipleFilterReturn<T extends FilterItem>
  extends UseFilterStateReturn<T> {
  selectedValues: any[]
}

export interface UseMultipleFilterStateProps<T extends FilterItem> {
  /** Function called when a change is applied. */
  onChange: ({ selected }: { selected: key[] }) => void
  /** The initial selected keys. */
  initialSelected?: key[]
  /** Filter button label. */
  label: string
  items: T[]
}

export interface UseFilterStateProps<T extends FilterItem>
  extends UseMultipleFilterStateProps<T> {
  /** set to multiple if filter is multiselect. */
  selectionMode: 'multiple' | 'single'
}
