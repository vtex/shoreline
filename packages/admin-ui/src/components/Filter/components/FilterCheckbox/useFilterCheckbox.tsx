import React, { useState, useCallback, useMemo, useRef } from 'react'
import type { UseFilterStateReturn, FilterItem } from '../Filter'
import { usePopoverState } from '../Popover'
import { Item } from '@react-stately/collections'

import { useListBox } from '@react-aria/listbox'
import { useListState } from '@react-stately/list'

export function useFilterCheckbox<T extends FilterItem>(
  props: UseFilterCheckboxStateProps<T>
): UseFilterCheckboxReturn {
  const { onApply, items } = props
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([])
  const popover = usePopoverState({ gutter: 0, placement: 'bottom-start' })

  const stateProps = {
    items,
    children: (item: FilterItem) => <Item>{item.label}</Item>,
    selectionMode: 'multiple' as const,
  }

  const ref = useRef(null)

  const listState = useListState<FilterItem>(stateProps)

  const { listBoxProps, labelProps } = useListBox<FilterItem>(
    stateProps,
    listState,
    ref
  )

  const selectedValues = useMemo(
    () => selectedKeys.map((k) => listState.collection.getItem(k).value.label),
    [selectedKeys, listState.collection]
  )

  const apply = useCallback(() => {
    const nextSelected = [...listState.selectionManager.selectedKeys]

    setSelectedKeys(nextSelected)
    onApply?.({ selected: nextSelected })
    popover.hide()
  }, [onApply])

  const clear = useCallback(() => {
    listState.selectionManager.clearSelection()
    setSelectedKeys([])
    onApply?.({ selected: [] })
    popover.hide()
  }, [onApply])

  return {
    popover,
    onClear: clear,
    onApply: apply,
    listState,
    selectedValues,
    ref,
    listBoxProps,
    labelProps,
  }
}

export interface UseFilterCheckboxReturn extends UseFilterStateReturn {
  selectedValues: any[]
  ref: any
  listBoxProps: any
  labelProps: any
  listState: any
}

export interface UseFilterCheckboxStateProps<T extends FilterItem> {
  onApply: ({ selected }: { selected: Array<string | number> }) => void
  initialState?: T[]
  items: T[]
  label: string
}
