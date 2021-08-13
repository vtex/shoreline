import { useEffect, useMemo } from 'react'

import { useCheckboxState } from '../Checkbox'

/**
 * SelectionTree state
 * @example
 * const state = useSelectionTreeState({
 *  items: []
 * })
 *
 * console.log(state.selectedItems) // to display the currently selected items
 */
export function useSelectionTreeState<T>(
  params: UseSelectionTreeStateParams<T>
): SelectionTreeState<T> {
  const {
    items,
    mapId = (item) => (item as any)?.id ?? '',
    isInitiallySelected = () => false,
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
            selected: isInitiallySelected(curr)
              ? [...acc.selected, id]
              : acc.selected,
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

  const currentSelected = useMemo(
    () =>
      selectedItems instanceof Array
        ? selectedItems.map((item) => dict[item])
        : [],
    [selectedItems, dict]
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
    selectedItems: currentSelected,
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

export interface SelectionTreeState<T> {
  /**
   * currently selected items
   */
  selectedItems: T[]
  /**
   * Root state
   */
  root: ReturnType<typeof useCheckboxState>
  /**
   * Items state
   */
  items: ReturnType<typeof useCheckboxState>
}

export interface UseSelectionTreeStateParams<T> {
  /**
   * Collection of items
   */
  items: T[]
  /**
   * Maps the unique key (id) for the collection
   * @default (item) => item.id
   */
  mapId?: (item: T) => string | number
  /**
   * Condition that makes an item initially selected
   * @default () => false
   */
  isInitiallySelected?: (item: T) => boolean
}
