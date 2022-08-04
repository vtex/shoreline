import { useState } from 'react'
import type { AnyObject } from '../..'
import type { UseFilterMultipleReturn } from '../filter-multiple/filter-multiple.state'
import { useFilterMultipleState } from '../filter-multiple/filter-multiple.state'
import type { FilterOption } from '../filter/filter.state'

export const useFilterShowState = (): FilterVisibilityStateReturn => {
  const state = useFilterMultipleState()
  const {
    appliedItems,
    setAppliedItems,
    combobox: { isSelected },
  } = state

  const [items, setItems] = useState<Array<FilterOption<any>>>([])
  const [filterOpenOnMount, setFilterOpenOnMount] =
    useState<FilterOption<any>>()

  const shouldOpenOnMount = (id: string) => {
    return filterOpenOnMount?.id === id
  }

  const addFilter = (newOne: FilterOption<any>) => {
    setItems((dd) => [...dd, newOne])
  }

  const removeFilter = (newOne: FilterOption<any>) => {
    setItems((dd) => dd.filter((i) => i.id !== newOne.id))
  }

  const onChange = () => {
    // action performed before new value for appliedItems is saved
    const oldItems = appliedItems
    const firstNewItem = items.find(
      (item) => isSelected(item) && !oldItems.find((i) => i.id === item.id)
    )

    setFilterOpenOnMount(firstNewItem)

    state.onChange()
  }

  return {
    addFilter,
    removeFilter,
    items,
    filterState: { ...state, onChange },
    visible: appliedItems,
    setVisible: setAppliedItems,
    shouldOpenOnMount,
  }
}

export interface FilterVisibilityStateReturn {
  addFilter: (filter: FilterOption<any>) => void
  removeFilter: (filter: FilterOption<any>) => void
  items: Array<FilterOption<any>>
  filterState: UseFilterMultipleReturn<AnyObject>
  visible: Array<FilterOption<any>>
  setVisible: (newValue: Array<FilterOption<any>>) => void
  shouldOpenOnMount: (id: string) => boolean
}
