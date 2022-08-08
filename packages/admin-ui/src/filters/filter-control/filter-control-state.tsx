import { useState } from 'react'
import type { AnyObject } from '../..'
import type { UseFilterMultipleReturn } from '../filter-multiple/filter-multiple.state'
import { useFilterMultipleState } from '../filter-multiple/filter-multiple.state'
import type { FilterOption } from '../filter/filter.state'

export const useFilterControl = (): FilterControlState => {
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

  const addFilter = (newFilter: FilterOption<any>) => {
    setItems((list) => [...list, newFilter])
  }

  const removeFilter = (removedFilter: FilterOption<any>) => {
    setItems((list) => list.filter((i) => i.id !== removedFilter.id))
  }

  const onChange = () => {
    // action performed before new value for appliedItems is saved
    const oldItems = appliedItems
    const firstNewSelectedItem = items.find((item) => {
      const isNew = !oldItems.find((i) => i.id === item.id)

      return isSelected(item) && isNew
    })

    setFilterOpenOnMount(firstNewSelectedItem)

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

export interface FilterControlState {
  addFilter: (filter: FilterOption<any>) => void
  removeFilter: (filter: FilterOption<any>) => void
  items: Array<FilterOption<any>>
  filterState: UseFilterMultipleReturn<AnyObject>
  visible: Array<FilterOption<any>>
  setVisible: (newValue: Array<FilterOption<any>>) => void
  shouldOpenOnMount: (id: string) => boolean
}
