import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCheckboxState } from '../checkbox'
import type { SelectionTreeState } from '../components/SelectionTree'

export function useBulkActions<T extends { id: string | number }>(
  props: UseBulkActionsParams<T>
): BulkActionsState<T> {
  const { pageItems = [], pageSize, totalItems } = props

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
      (acc: MappedPageItems<T>, item) => ({
        ids: [...acc.ids, item.id],
        mapPageItem: { ...acc.mapPageItem, [item.id]: item },
      }),
      { ids: [], mapPageItem: {} }
    )
  }, [pageItems])

  const getSelectedIds = useCallback(() => {
    if (!Array.isArray(selectedItemsIds)) return []

    return selectedItemsIds
  }, [selectedItemsIds])

  const pageSelectedItems = useMemo(
    () => getSelectedIds().map((item) => mapPageItem[item]),
    [getSelectedIds, mapPageItem]
  )

  const mapSelectedIds = useMemo<Record<string | number, boolean>>(() => {
    return getSelectedIds().reduce((acc, i) => ({ ...acc, [i]: true }), {})
  }, [getSelectedIds])

  const isItemSelected = useCallback(
    (item: T) => {
      return allSelected || !!mapSelectedIds[item.id]
    },
    [mapSelectedIds, allSelected]
  )

  useEffect(() => {
    if (root === 'indeterminate' || Array.isArray(root)) return

    toggleItems()
  }, [root])

  useEffect(() => {
    if (allSelected) return

    const rootState = resolveRootState()

    setRoot(rootState)
  }, [pageItems, selectedItemsIds, allSelected])

  const selectedPageItems = useCallback(() => {
    return pageItems.filter((item) => !!isItemSelected(item))
  }, [pageItems, isItemSelected])

  const resolveRootState = useCallback(() => {
    const numberOfItems = selectedPageItems().length

    if (numberOfItems === pageSize) {
      return true
    }

    if (numberOfItems > 0) {
      return 'indeterminate'
    }

    return false
  }, [selectedPageItems, pageSize])

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
  totalItems: number
  pageSize: number
}

interface MappedPageItems<T> {
  ids: Array<number | string>
  mapPageItem: Record<string | number, T>
}
