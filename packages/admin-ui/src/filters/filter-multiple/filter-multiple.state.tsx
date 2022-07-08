import { useState, useEffect } from 'react'

import type { ComboboxMultipleState } from '../../combobox'
import { useComboboxMultipleState } from '../../combobox'

import type { AnyObject } from '@vtex/admin-ui-util'
import type {
  GenericFilterStateReturn,
  ItemList,
  FilterOption,
} from '../filter/filter.state'
import { useMenuState } from 'ariakit'

export function useFilterMultipleState<T extends AnyObject>(
  props?: UseFilterMultipleStateProps<T>
): UseFilterMultipleReturn<T> {
  const { fullList = [] } = props || {}

  const [appliedItems, setAppliedItems] = useState<ItemList<T>>([])

  const comboboxMultiple = useComboboxMultipleState<FilterOption<T>>({
    list: fullList,
    getOptionValue: (option) => option.label,
    compare: (optionA, optionB) => optionA.id === optionB.id,
  })

  const menu = useMenuState(comboboxMultiple)

  useEffect(() => {
    comboboxMultiple.setSelectedItems([])
  }, [])

  const { selectedItems } = comboboxMultiple

  const updateApplied = (items: ItemList<T>) => {
    comboboxMultiple.setSelectedItems(items)
    setAppliedItems(items)
  }

  const apply = () => {
    setAppliedItems(selectedItems)
    menu.hide()
  }

  const clear = () => {
    comboboxMultiple.clearSelected()

    setAppliedItems([])
    menu.hide()
  }

  useEffect(() => {
    const isMenuClosed = !menu.mounted
    const hasSelectedItem = comboboxMultiple.value || selectedItems?.length

    if (isMenuClosed && hasSelectedItem) {
      // resets combobox
      comboboxMultiple.setValue('')
      comboboxMultiple.setSelectedItems(appliedItems)
    }
  }, [menu.mounted])

  const getFromApplied = (key: string) => {
    return appliedItems
      .map((item) => item?.[key as keyof FilterOption<T>] || item?.value?.[key])
      .filter((item) => item !== undefined)
  }

  return {
    combobox: comboboxMultiple,
    onClear: clear,
    onChange: apply,
    appliedItems,
    setAppliedItems: updateApplied,
    selectedItems,
    menu,
    getFromApplied,
  }
}

export interface UseFilterMultipleReturn<T>
  extends GenericFilterStateReturn<T> {
  combobox: ComboboxMultipleState<FilterOption<T>>
  appliedItems: ItemList<T>
  selectedItems: ItemList<T>
  setAppliedItems: (items: ItemList<T>) => void
  getFromApplied: (key: string) => any[]
}

export interface UseFilterMultipleStateProps<T> {
  /** List of items to be showed on the list. */
  fullList?: ItemList<T>
}
