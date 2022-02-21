import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import type { UseFilterStateReturn, FilterItem } from '../Filter'
import { usePopoverState } from 'reakit/Popover'
import { Item } from '@react-stately/collections'
import { useListBox } from '@react-aria/listbox'
import type { ListState } from '@react-stately/list'
import { useListState } from '@react-stately/list'

export function useMultipleFilter<T extends FilterItem>(
  props: UseMultipleFilterStateProps<T>
): UseMultipleFilterReturn<T> {
  const { onApply, items, label } = props
  const stateProps = {
    items,
    children: (item: FilterItem) => <Item>{item.label}</Item>,
    selectionMode: 'multiple' as const,
  }

  const [selectedKeys, setSelectedKeys] = useState<key[]>([])

  const ref = useRef(null)

  const popover = usePopoverState({ gutter: 0, placement: 'bottom-start' })

  const listState = useListState<T>(stateProps)

  const { listBoxProps, labelProps } = useListBox<FilterItem>(
    { ...stateProps, 'aria-label': label },
    listState,
    ref
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
    onApply: apply,
    listState,
    selectedValues,
    ref,
    listBoxProps,
    label,
    labelProps,
  }
}

type key = string | number

export interface UseMultipleFilterReturn<T extends FilterItem>
  extends UseFilterStateReturn {
  selectedValues: any[]
  ref: React.MutableRefObject<null>
  listBoxProps: React.HTMLAttributes<HTMLElement>
  labelProps: React.HTMLAttributes<HTMLElement>
  listState: ListState<T>
  label: string
}

export interface UseMultipleFilterStateProps<T extends FilterItem> {
  onApply: ({ selected }: { selected: key[] }) => void
  initialState?: T[]
  items: T[]
  label: string
}
