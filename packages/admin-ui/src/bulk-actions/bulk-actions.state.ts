import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCheckboxState } from '../checkbox'
import type { SelectionTreeState } from '../components/SelectionTree'

export function useBulkActions<T extends { id: string | number }>(
  props: UseBulkActionsParams<T>
): BulkActionsState<T> {
  const { pageItems = [], currentPage, totalItems } = props

  const [allSelected, setAllSelected] = useState<boolean>(false)

  const { value: root, setValue: setRoot } = useCheckboxState({
    initialValue: false,
  })

  const { value: selectedItemsIds, setValue: setSelectedItemsIds } =
    useCheckboxState({
      initialValue: [],
    })

  const isItemSelected = (item: T) => {
    return !!mapSelectedIds[item.id]
  }

  const getSelectedIds = useCallback(() => {
    if (!Array.isArray(selectedItemsIds)) return []

    return selectedItemsIds
  }, [selectedItemsIds])

  const { mapItem, ids: pageIds } = useMemo(() => {
    return pageItems.reduce(
      (
        acc: {
          ids: Array<number | string>
          mapItem: Record<string | number, T>
        },
        item
      ) => ({
        ids: [...acc.ids, item.id],
        mapItem: { ...acc.mapItem, [item.id]: item },
      }),
      { ids: [], mapItem: {} }
    )
  }, [currentPage])

  const selectedItems = useMemo(
    () =>
      selectedItemsIds instanceof Array
        ? selectedItemsIds.map((item) => mapItem[item])
        : [],
    [selectedItemsIds, mapItem]
  )

  const mapSelectedIds: Record<string | number, boolean> = useMemo(() => {
    return getSelectedIds().reduce((acc, i) => ({ ...acc, [i]: true }), {})
  }, [getSelectedIds])

  useEffect(() => {
    if (root === 'indeterminate' || Array.isArray(root)) return

    toggleItems()
  }, [root])

  useEffect(() => {
    if (allSelected) return

    const rootState = resolveRootState()

    setRoot(rootState)
  }, [currentPage, selectedItemsIds, allSelected])

  const selectedPageItems = useCallback(() => {
    return pageItems.filter((item) => !!mapSelectedIds[item.id])
  }, [currentPage, mapSelectedIds])

  const resolveRootState = useCallback(() => {
    const pageSize = pageItems.length

    const numberOfItems = selectedPageItems().length

    if (numberOfItems === pageSize) {
      return true
    }

    if (numberOfItems > 0) {
      return 'indeterminate'
    }

    return false
  }, [currentPage, selectedPageItems])

  const toggleItems = () => {
    const filteredSelectedItems = getSelectedIds().filter((i) => !mapItem[i])

    const nextSelectedItems = root
      ? [...filteredSelectedItems, ...pageIds]
      : filteredSelectedItems

    setSelectedItemsIds(nextSelectedItems)
  }

  const isVisible = useMemo(() => {
    return allSelected || getSelectedIds().length > 0
  }, [allSelected, getSelectedIds])

  return {
    setAllSelected,
    pageIds,
    allSelected,
    root,
    setRoot,
    selectedItems,
    selectedItemsIds,
    setSelectedItemsIds,
    isItemSelected,
    isVisible,
    totalItems,
    selectionTree: {
      root: { value: root, setValue: setRoot },
      items: { value: selectedItemsIds, setValue: setSelectedItemsIds },
      selectedItems,
      allSelected,
    },
  }
}

export interface BulkActionsState<T> {
  setAllSelected: Dispatch<SetStateAction<boolean>>
  allSelected: boolean
  pageIds: Array<number | string>
  root: boolean | any[] | 'indeterminate'
  setRoot: Dispatch<SetStateAction<boolean | 'indeterminate' | any[]>>
  selectedItems: T[]
  selectedItemsIds: boolean | any[] | 'indeterminate'
  setSelectedItemsIds: (
    value: SetStateAction<boolean | any[] | 'indeterminate'>
  ) => void
  isItemSelected: (item: T) => boolean
  isVisible: boolean
  totalItems: number
  selectionTree: SelectionTreeState<T>
}

interface UseBulkActionsParams<T> {
  pageItems: T[]
  currentPage?: number
  totalItems: number
}
