import { useState, useCallback, useEffect } from 'react'

import { useMenuState } from 'ariakit/menu'
import type { ComboboxState } from '../combobox/combobox.state'
import { useComboboxState } from '../combobox/combobox.state'

export function useFilterState<T extends FilterItem>(
  props: UseFilterStateProps<T>
): UseFilterStateReturn<T> {
  const { items, label, initialApplied, onChange = () => {} } = props

  const [appliedKey, setAppliedKey] = useState(initialApplied?.id || null)
  const [appliedItem, setAppliedItem] = useState(initialApplied || null)

  const combobox = useComboboxState({
    virtualFocus: false,
    list: items,
    getOptionValue: (item) => item.label,
  })

  useEffect(() => {
    combobox.setSelectedItem(initialApplied)
  }, [])

  const menu = useMenuState({ ...combobox, gutter: 4 })

  const apply = useCallback(() => {
    const selected = combobox.selectedItem?.id || null

    setAppliedKey(selected)
    setAppliedItem(combobox.selectedItem || null)

    onChange({ selected })
    menu.hide()
  }, [onChange])

  const clear = useCallback(() => {
    setAppliedKey(null)
    setAppliedItem(null)

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
    // Resets combobox value when menu is closed
    if (!menu.mounted && combobox.value) {
      combobox.setValue('')
      combobox.setSelectedItem(appliedItem || undefined)
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
  }
}

export interface FilterItem {
  id: string
  label: string
}

export interface GenericFilterStateReturn<T> {
  menu: any
  onClear: () => void
  onChange: () => void
  label: string
  items: T[]
  combobox: ComboboxState<T>
}

export interface UseFilterStateReturn<T> extends GenericFilterStateReturn<T> {
  appliedItem?: T | null
  appliedKey: string | null
}

export interface UseFilterStateProps<T> {
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: string | null }) => void
  /** The initial selected key. */
  initialApplied?: T
  /** Filter button label. */
  label: string
  items: T[]
}
