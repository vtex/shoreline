import { useState, useCallback, useEffect } from 'react'

import type { MenuState } from 'ariakit/menu'
import { useMenuState } from 'ariakit/menu'
import type { ComboboxState } from '../combobox/combobox.state'
import { useComboboxState } from '../combobox/combobox.state'

export function useFilterState<T extends FilterItem>(
  props: UseFilterStateProps<T>
): UseFilterStateReturn<T> {
  const { items, label, initialApplied, baseId, onChange = () => {} } = props

  const [appliedKey, setAppliedKey] = useState(initialApplied || null)
  const [appliedItem, setAppliedItem] = useState<T>()

  const combobox = useComboboxState({
    virtualFocus: false,
    list: items,
    getOptionValue: (item) => item.id,
  })

  useEffect(() => {
    const initialItem = items.find((item) => item.id === initialApplied)

    combobox.setSelectedItem(initialItem)
    setAppliedItem(initialItem)
  }, [])

  const menu = useMenuState({ ...combobox, gutter: 4 })

  const apply = useCallback(() => {
    const selected = combobox.value

    setAppliedKey(selected)
    setAppliedItem(combobox.selectedItem)

    onChange({ selected })
    menu.hide()
  }, [onChange])

  const clear = useCallback(() => {
    setAppliedKey(null)
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
      combobox.setSelectedItem(appliedItem)
    }
  }, [menu.mounted])

  return {
    menu,
    combobox,
    onClear: clear,
    onChange: apply,
    items,
    appliedItem,
    appliedKey,
    label,
    baseId,
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
}

export interface UseFilterStateReturn<T> extends GenericFilterStateReturn<T> {
  appliedItem?: T | null
  appliedKey: string | null
}

export interface UseFilterStateProps<T> {
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: string | null }) => void
  /** The initial selected key. */
  initialApplied?: string
  /** Filter button label. */
  label: string
  /** Base for component and it's children id. */
  baseId?: string
  /** List of items to be showed on the list. */
  items: T[]
}
