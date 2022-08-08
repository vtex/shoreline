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

  const { mapPageItem, ids: pageIds } = useMemo(() => {
    return pageItems.reduce(
      (
        acc: {
          ids: Array<number | string>
          mapPageItem: Record<string | number, T>
        },
        item
      ) => ({
        ids: [...acc.ids, item.id],
        mapPageItem: { ...acc.mapPageItem, [item.id]: item },
      }),
      { ids: [], mapPageItem: {} }
    )
  }, [currentPage])

  const getSelectedIds = useCallback(() => {
    if (!Array.isArray(selectedItemsIds)) return []

    return selectedItemsIds
  }, [selectedItemsIds])

  const pageSelectedItems = useMemo(
    () => getSelectedIds().map((item) => mapPageItem[item]),
    [getSelectedIds, mapPageItem]
  )

  const mapSelectedIds: Record<string | number, boolean> = useMemo(() => {
    return getSelectedIds().reduce((acc, i) => ({ ...acc, [i]: true }), {})
  }, [getSelectedIds])

  const isItemSelected = useCallback(
    (item: T) => {
      return !!mapSelectedIds[item.id]
    },
    [mapSelectedIds]
  )

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
    return pageItems.filter((item) => !!isItemSelected(item))
  }, [currentPage, isItemSelected])

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
    const filteredSelectedItems = getSelectedIds().filter(
      (i) => !mapPageItem[i]
    )

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
    getSelectedIds,
    pageIds,
    allSelected,
    root,
    setRoot,
    pageSelectedItems,
    selectedItemsIds,
    setSelectedItemsIds,
    isItemSelected,
    isVisible,
    totalItems,
    selectionTree: {
      root: { value: root, setValue: setRoot },
      items: { value: selectedItemsIds, setValue: setSelectedItemsIds },
      selectedItems: pageSelectedItems,
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
  pageSelectedItems: T[]
  getSelectedIds: () => Array<number | string>
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
