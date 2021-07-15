import React, { ReactNode, useMemo } from 'react'

import { Checkbox, useCheckboxState } from '../../Checkbox'
import { createResolver, ResolverRenderProps } from './core'

export const SelectionContext = React.createContext<ReturnType<
  typeof useSelectionState
> | null>(null)

export function selectionResolver<T>() {
  return createResolver<T, 'selection', SelectionResolver<T>>({
    header: function Resolve({ context }) {
      return (
        <SelectionContext.Consumer>
          {(state) => {
            return (
              <Checkbox
                state={state?.root}
                disabled={context.status === 'loading'}
                onClick={(e) => e.stopPropagation()}
              />
            )
          }}
        </SelectionContext.Consumer>
      )
    },
    cell: function Resolve({ context, column, item }) {
      const { resolver } = column

      return (
        <SelectionContext.Consumer>
          {(state) => {
            return (
              <Checkbox
                value={resolver?.mapId(item)}
                state={state?.items}
                disabled={context.status === 'loading'}
                onClick={(e) => e.stopPropagation()}
              />
            )
          }}
        </SelectionContext.Consumer>
      )
    },
  })
}

export function SelectionProvider<T>(props: SelectionProviderProps<T>) {
  const { items, children, mapId, isSelected, onSelect } = props
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
    [mapId, isSelected, items]
  )

  const state = useSelectionState({ itemsId: ids, selected, onSelect, dict })

  return (
    <SelectionContext.Provider value={state}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelectionState<T>(params: UseTreeStateParams<T>) {
  const { itemsId, selected, onSelect, dict } = params
  const { state: rootState, setState: setRootState } = useCheckboxState({
    state: [],
  })

  const { state: selectedItems, setState: setSelectedItems } = useCheckboxState(
    {
      state: selected,
    }
  )

  React.useEffect(
    function handleSelectItem() {
      const currentSelected =
        selectedItems instanceof Array
          ? selectedItems.map((item) => dict[item])
          : []

      onSelect(currentSelected)
    },
    [selectedItems, onSelect, dict]
  )

  React.useEffect(
    function updateItemsOnToggleRoot() {
      if (rootState === true) {
        setSelectedItems(itemsId)
      } else if (rootState === false) {
        setSelectedItems([])
      }
    },
    [rootState, setSelectedItems, itemsId]
  )

  React.useEffect(
    function updateRootOnToggleItems() {
      if (
        selectedItems instanceof Array &&
        selectedItems.length === itemsId.length
      ) {
        setRootState(true)
      } else if (selectedItems instanceof Array && selectedItems.length) {
        setRootState('indeterminate')
      } else {
        setRootState(false)
      }
    },
    [setRootState, selectedItems, itemsId]
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

export interface UseTreeStateParams<T> {
  itemsId: Array<string | number>
  selected: Array<string | number>
  onSelect: (items: T[]) => void
  dict: Record<string, T>
}

export interface SelectionProviderProps<T> {
  items: T[]
  mapId: (item: T) => string | number
  isSelected: (item: T) => boolean
  onSelect: (items: T[]) => void
  children: ReactNode
}

export interface SelectionResolver<T> {
  type: 'selection'
  mapId: (item: T) => string | number
  isSelected?: (item: T) => boolean
  onSelect?: (items: T[]) => void
  render?: (props: ResolverRenderProps<ReactNode, T>) => ReactNode
}
