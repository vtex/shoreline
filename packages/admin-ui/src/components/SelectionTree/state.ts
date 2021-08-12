import { useEffect, useMemo } from 'react'

import { useCheckboxState } from '../Checkbox'

export function useSelectionTreeState<T>(
  params: UseSelectionTreeStateParams<T>
): SelectionTreeState {
  const {
    items,
    mapId = (item) => (item as any)?.id ?? '',
    isSelected = () => false,
    onSelect = () => null,
  } = params

  const { ids, selected, dict } = useMemo(
    () =>
      items.reduce<{
        ids: Array<string | number>
        dict: Record<string, T>
        selected: Array<string | number>
      }>(
        (acc, curr) => {
          const id = mapId(curr)

          return {
            ids: [...acc.ids, id],
            dict: {
              [id]: curr,
              ...acc.dict,
            },
            selected: isSelected(curr) ? [...acc.selected, id] : acc.selected,
          }
        },
        {
          ids: [],
          selected: [],
          dict: {},
        }
      ),
    [items]
  )

  const { state: rootState, setState: setRootState } = useCheckboxState({
    state: [],
  })

  const { state: selectedItems, setState: setSelectedItems } = useCheckboxState(
    {
      state: selected,
    }
  )

  useEffect(
    function handleSelectItem() {
      const currentSelected =
        selectedItems instanceof Array
          ? selectedItems.map((item) => dict[item])
          : []

      onSelect(currentSelected)
    },
    [selectedItems, onSelect, dict]
  )

  useEffect(
    function updateItemsOnToggleRoot() {
      if (rootState === true) {
        setSelectedItems(ids)
      } else if (rootState === false) {
        setSelectedItems([])
      }
    },
    [rootState, setSelectedItems, ids]
  )

  useEffect(
    function updateRootOnToggleItems() {
      if (
        selectedItems instanceof Array &&
        selectedItems.length === ids.length
      ) {
        setRootState(true)
      } else if (selectedItems instanceof Array && selectedItems.length) {
        setRootState('indeterminate')
      } else {
        setRootState(false)
      }
    },
    [setRootState, selectedItems, ids]
  )

  return {
    root: {
      state: rootState,
      setState: setRootState,
    },
    items: {
      state: selectedItems,
      setState: setSelectedItems,
    },
  }
}

export interface SelectionTreeState {
  root: ReturnType<typeof useCheckboxState>
  items: ReturnType<typeof useCheckboxState>
}

export interface UseSelectionTreeStateParams<T> {
  items: T[]
  mapId?: (item: T) => string | number
  isSelected?: (item: T) => boolean
  onSelect?: (items: T[]) => void
}
