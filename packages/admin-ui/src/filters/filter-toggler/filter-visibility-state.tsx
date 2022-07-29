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
    combobox: { onChange, isSelected },
    appliedItems,
    setAppliedItems,
  } = state

  const [lastSelected, setLastSelected] = useState<FilterOption<any>>()

  const combobox = {
    ...state.combobox,
    onChange: (item: FilterOption<any>) => {
      onChange(item)

      if (!isSelected(item) && !appliedItems.some((i) => i.id === item.id)) {
        setLastSelected(item)
      }
    },
  }

  return {
    items: props.items,
    filterState: { ...state, combobox },
    visible: appliedItems,
    setVisible: setAppliedItems,
    lastSelected,
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
  lastSelected?: FilterOption<any>
}
