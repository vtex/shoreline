import { useState, useCallback, useEffect } from 'react'

import type { MenuState } from 'ariakit/menu'
import { useMenuState } from 'ariakit/menu'
import type { ComboboxState } from '../../combobox/combobox.state'
import { useComboboxState } from '../../combobox/combobox.state'
import type { AnyObject } from 'packages/admin-ui-util'

export function useFilterState<T extends AnyObject>(
  props: UseFilterStateProps<T>
): UseFilterStateReturn<T> {
  const {
    items,
    label,
    baseId,
    getOptionLabel = (option) => option.label,
    getOptionId = (option) => option.id,
    onChange = () => {},
  } = props

  const [appliedItem, setAppliedItem] = useState<T>()

  const combobox = useComboboxState({
    virtualFocus: false,
    list: items || [],
    getOptionValue: getOptionLabel,
  })

  const menu = useMenuState({ ...combobox, gutter: 4 })

  const apply = useCallback(() => {
    setAppliedItem(combobox.selectedItem)

    onChange({ selected: combobox.selectedItem || null })
    menu.hide()
  }, [onChange])

  const clear = useCallback(() => {
    setAppliedItem(undefined)

    combobox.setValue('')
    combobox.setSelectedItem(undefined)

    onChange({ selected: null })
    menu.hide()
  }, [onChange])

  useEffect(() => {
    // auto applies whenever a new value is selected
    if (combobox.selectedItem) {
      apply()
    }
  }, [combobox.selectedItem])

  useEffect(() => {
    const isMenuClosed = !menu.mounted

    if (isMenuClosed && combobox.value) {
      // resets combobox
      combobox.setValue('')
      combobox.setSelectedItem(appliedItem || undefined)
    }
  }, [menu.mounted])

  return {
    menu,
    combobox,
    onClear: clear,
    onChange: apply,
    items: items || [],
    appliedItem,
    setAppliedItem,
    label,
    baseId,
    getOptionLabel,
    getOptionId,
  }
}

export interface FilterItem {
  id: string
  label: string
}

export interface GenericFilterStateReturn<T> {
  menu: MenuState<any>
  onClear: () => void
  onChange: () => void
  label: string
  items: T[]
  combobox: ComboboxState<T>
  baseId?: string
  getOptionLabel: (option: T) => string
  getOptionId: (option: T) => string
}

export interface UseFilterStateReturn<T> extends GenericFilterStateReturn<T> {
  appliedItem?: T | null
  setAppliedItem: (option: T) => void
}

export interface UseFilterStateProps<T> {
  /** Function for getting an id from the option object. */
  getOptionId?: (option: T) => string
  /** Function for getting a label from the option object. */
  getOptionLabel?: (option: T) => string
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: T | null }) => void
  /** Filter button label. */
  label: string
  /** Base for component and it's children id. */
  baseId?: string
  /** List of items to be showed on the list. */
  items?: T[]
}
