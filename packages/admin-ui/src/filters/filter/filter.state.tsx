import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect } from 'react'

import type { ComboboxState } from '../../combobox/combobox.state'
import { useComboboxState } from '../../combobox/combobox.state'
import type { AnyObject } from '@vtex/admin-ui-util'
import type { MenuState } from 'ariakit'
import { useMenuState } from 'ariakit'
import type { FilterStatus } from '../use-filter-status'
import { useFilterStatus } from '../use-filter-status'

export function useFilterState<T extends AnyObject>(
  props?: UseFilterStateProps<T>
): UseFilterStateReturn<T> {
  const { searchableList: initialSearchableList = [] } = props || {}

  const [appliedItem, setAppliedItem] = useState<FilterOption<T>>()
  const [searchableList, setSearchableList] = useState(initialSearchableList)

  const combobox = useComboboxState<FilterOption<T>>({
    list: searchableList,
    virtualFocus: false,
    getOptionValue: (option) => option.label,
  })

  const menu = useMenuState({ ...combobox, gutter: 8 })
  const { status, setStatus } = useFilterStatus(combobox)

  const updateApplied = (item: FilterOption<T>) => {
    combobox.setSelectedItem(item)
    setAppliedItem(item)
  }

  const apply = () => {
    setAppliedItem(combobox.selectedItem)

    menu.hide()
  }

  const clear = () => {
    setAppliedItem(undefined)

    combobox.setValue('')
    combobox.setSelectedItem(undefined)

    menu.hide()
  }

  useEffect(() => {
    const isMenuClosed = !menu.mounted

    if (isMenuClosed && combobox.value) {
      // resets combobox
      combobox.setValue('')
      combobox.setSelectedItem(appliedItem || undefined)
    }
  }, [menu.mounted, appliedItem])

  useEffect(() => {
    combobox.setMatches(searchableList)
  }, [searchableList])

  const getFromApplied = (key: string) => {
    return (
      appliedItem?.[key as keyof FilterOption<T>] || appliedItem?.value?.[key]
    )
  }

  const {
    matches,
    setMatches,
    deferredValue: deferredSearchValue,
    value: searchValue,
  } = combobox

  return {
    combobox,
    menu,
    onClear: clear,
    onChange: apply,
    appliedItem,
    setAppliedItem: updateApplied,
    getFromApplied,
    status,
    setStatus,
    setSearchableList,
    matches,
    setMatches,
    deferredSearchValue,
    searchValue,
  }
}

export type ItemList<T> = Array<FilterOption<T>>

export interface FilterOption<T> {
  id: string
  label: string
  value?: T
}

export interface GenericFilterStateReturn<T> {
  onClear: () => void
  onChange: () => void
  combobox: ComboboxState<FilterOption<T>>
  menu: MenuState
  status: FilterStatus
  setStatus: (status: FilterStatus) => void
  setSearchableList: Dispatch<SetStateAction<ItemList<T>>>
  searchValue?: string
  deferredSearchValue?: string
  matches: ItemList<T>
  setMatches: (items: ItemList<T>) => void
}

export interface UseFilterStateReturn<T> extends GenericFilterStateReturn<T> {
  appliedItem?: FilterOption<T>
  setAppliedItem: (option: FilterOption<T>) => void
  getFromApplied: (key: string) => any
}

export interface UseFilterStateProps<T> {
  /** List of items to be showed on the list. */
  searchableList?: ItemList<T>
}
