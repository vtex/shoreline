import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useCheckboxState } from '../checkbox'

interface UseBulkActionsParams {
  totalItems: number
  pageItems: any[]
  currentPage: number
}

export function useBulkActions(props: UseBulkActionsParams) {
  const { totalItems, pageItems = [], currentPage } = props

  const [allSelected, setAllSelected] = useState<boolean>(false)

  const { value: root, setValue: setRoot } = useCheckboxState({
    initialValue: false,
  })

  const [selectedItems, setSelectedItems] = useState<any[]>([])

  const isItemSelected = (item: any, items = selectedItems) => {
    return items.some((i) => i.id === item.id)
  }

  const selectedPageItems = (selectedItems: any[]) => {
    return pageItems.filter((item) => isItemSelected(item, selectedItems))
      .length
  }

  const rootResolver = (selectedItems: any[]) => {
    const pageSize = pageItems.length

    if (selectedPageItems(selectedItems) === pageSize) {
      return true
    }

    if (selectedPageItems(selectedItems) > 0) {
      return 'indeterminate'
    }

    return false
  }

  const toggleRoot = (items: any[]) => {
    const nextSelectedItems = root
      ? [...selectedItems, ...items.filter((i) => !isItemSelected(i))]
      : selectedItems.filter((i) => !isItemSelected(i, items))

    setSelectedItems(nextSelectedItems)
  }

  useEffect(() => {
    if (root === 'indeterminate' || Array.isArray(root)) return

    toggleRoot(pageItems)
  }, [root])

  useEffect(() => {
    setRoot(rootResolver(selectedItems))
  }, [currentPage])

  const toggleItem = (item: any) => {
    const nextSelectedItems = isItemSelected(item)
      ? selectedItems.filter((i) => i.id !== item.id)
      : [...selectedItems, item]

    const pageState = rootResolver(nextSelectedItems)

    setSelectedItems(nextSelectedItems)
    setRoot(pageState)
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
    isItemSelected,
    toggleItem,
    isVisible,
    totalItems,
  }
}

export interface BulkActionsState {
  selectAll: () => void
  toggleItem: (item: any) => void
  setAllSelected: Dispatch<SetStateAction<boolean>>
  allSelected: boolean
  pageSelected: boolean | any[] | 'indeterminate'
  setPageSelected: Dispatch<SetStateAction<boolean | 'indeterminate' | any[]>>
  selectedItems: any[]
  isItemSelected: (item: any) => boolean
  isVisible: boolean
  totalItems: number
}
