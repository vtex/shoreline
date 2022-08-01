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
import { useFilterStatus } from '../use-filter-status'

export function useFilterMultipleState<T extends AnyObject>(
  props?: UseFilterMultipleStateProps<T>
): UseFilterMultipleReturn<T> {
  const { fullList: initialFullList = [] } = props || {}

  const [appliedItems, setAppliedItems] = useState<ItemList<T>>([])
  const [fullList, setFullList] = useState(initialFullList)

  const comboboxMultiple = useComboboxMultipleState<FilterOption<T>>({
    list: fullList,
    getOptionValue: (option) => option.label,
    compare: (optionA, optionB) => optionA.id === optionB.id,
  })

  const menu = useMenuState(comboboxMultiple)
  const { status, setStatus } = useFilterStatus(comboboxMultiple)

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

  useEffect(() => {
    comboboxMultiple.setMatches(fullList)
  }, [fullList])

  const getFromApplied = (key: string) => {
    return appliedItems
      .map((item) => item?.[key as keyof FilterOption<T>] || item?.value?.[key])
      .filter((item) => item !== undefined)
  }

  const {
    matches,
    setMatches,
    deferredValue: deferredSearchValue,
    value: searchValue,
  } = comboboxMultiple

  return {
    combobox: comboboxMultiple,
    onClear: clear,
    onChange: apply,
    appliedItems,
    setAppliedItems: updateApplied,
    selectedItems,
    menu,
    getFromApplied,
    status,
    setStatus,
    setFullList,
    matches,
    setMatches,
    deferredSearchValue,
    searchValue,
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
