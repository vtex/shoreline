import { useState } from 'react'
import type { AnyObject } from '../..'
import type { UseFilterMultipleReturn } from '../filter-multiple/filter-multiple.state'
import { useFilterMultipleState } from '../filter-multiple/filter-multiple.state'
import type { FilterOption } from '../filter/filter.state'

export const useFilterShowState = (
  props: FilterVisibilityStateProps
): FilterVisibilityStateReturn => {
  const state = useFilterMultipleState()
  const {
    appliedItems,
    setAppliedItems,
    combobox: { isSelected },
  } = state

  const [firstNewFilter, setFirstNewFilter] = useState<FilterOption<any>>()

  const onChange = () => {
    // action performed before new value for appliedItems is saved
    const oldItems = appliedItems
    const firstNewItem = props.items.find(
      (item) => isSelected(item) && !oldItems.find((i) => i.id === item.id)
    )

    setFirstNewFilter(firstNewItem)

    state.onChange()
  }

  return {
    items: props.items,
    filterState: { ...state, onChange },
    visible: appliedItems,
    setVisible: setAppliedItems,
    firstNewFilter,
  }
}

interface FilterVisibilityStateProps {
  items: Array<FilterOption<any>>
}

export interface FilterVisibilityStateReturn {
  items: Array<FilterOption<any>>
  filterState: UseFilterMultipleReturn<AnyObject>
  visible: Array<FilterOption<any>>
  setVisible: (newValue: Array<FilterOption<any>>) => void
  firstNewFilter?: FilterOption<any>
}
