import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCheckboxState } from '../checkbox'

export function useBulkActions<T extends { id: string | number }>(
  props: UseBulkActionsParams<T>
): BulkActionsState<T> {
  const { pageItems = [], currentPage, totalItems } = props

  const [allSelected, setAllSelected] = useState<boolean>(false)

  const { value: root, setValue: setRoot } = useCheckboxState({
    initialValue: false,
  })

  const [selectedItems, setSelectedItems] = useState<T[]>([])

  useEffect(() => {
    if (root === 'indeterminate' || Array.isArray(root)) return

    toggleItems(pageItems)
  }, [root])

  useEffect(() => {
    setRoot(rootResolver(selectedItems))
  }, [currentPage, selectedItems])

  const isItemSelected = useCallback(
    (item: T, items: T[] = selectedItems) => {
      return items.some((i: T) => i.id === item.id)
    },
    [selectedItems]
  )

  const selectedPageItems = (selectedItems: T[]) => {
    return pageItems.filter((item) => isItemSelected(item, selectedItems))
  }

  const rootResolver = (selectedItems: T[]) => {
    const pageSize = pageItems.length

    const numberOfItems = selectedPageItems(selectedItems).length

    if (numberOfItems === pageSize) {
      return true
    }

    if (numberOfItems > 0) {
      return 'indeterminate'
    }

    return false
  }

  const toggleItems = (items: T[]) => {
    const nextSelectedItems = root
      ? [...selectedItems, ...items.filter((i) => !isItemSelected(i))]
      : selectedItems.filter((i) => !isItemSelected(i, items))

    setSelectedItems(nextSelectedItems)
  }

  const toggleItem = (item: T) => {
    const nextSelectedItems =
      isItemSelected(item) || allSelected
        ? selectedItems.filter((i) => i.id !== item.id)
        : [...selectedItems, item]

    setSelectedItems(nextSelectedItems)
    setRoot(rootResolver(nextSelectedItems))
    setAllSelected(false)
  }

  const selectAll = () => {
    setAllSelected(true)
  }

  const isVisible = useMemo(() => {
    return allSelected || selectedItems.length > 0
  }, [allSelected, selectedItems])

  return {
    selectAll,
    setAllSelected,
    allSelected,
    root,
    setRoot,
    selectedItems,
    setSelectedItems,
    isItemSelected,
    toggleItem,
    isVisible,
    totalItems,
  }
}

export interface BulkActionsState<T> {
  selectAll: () => void
  setAllSelected: Dispatch<SetStateAction<boolean>>
  allSelected: boolean
  root: boolean | any[] | 'indeterminate'
  setRoot: Dispatch<SetStateAction<boolean | 'indeterminate' | any[]>>
  selectedItems: T[]
  setSelectedItems: Dispatch<SetStateAction<T[]>>
  isItemSelected: (item: T, items?: T[]) => boolean
  toggleItem: (item: T) => void
  isVisible: boolean
  totalItems: number
}

interface UseBulkActionsParams<T> {
  pageItems: T[]
  currentPage?: number
  totalItems: number
}
