import { useState, useCallback, useEffect } from 'react'

import { useMenuState } from 'ariakit/menu'
import type { ComboboxState } from '../combobox/combobox.state'
import { useComboboxState } from '../combobox/combobox.state'

export function useFilterState<T extends FilterItem>(
  props: UseFilterStateProps<T>
): UseFilterStateReturn<T> {
  const { items, label, initialApplied, onChange = () => {} } = props

  const [appliedKey, setAppliedKey] = useState(initialApplied || null)
  const [appliedItem, setAppliedItem] = useState<T>()

  const combobox = useComboboxState({
    virtualFocus: false,
    list: items,
    getOptionValue: (item) => item.id,
  })

  useEffect(() => {
    const initialItem = items.find((it) => it.id === initialApplied)

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
    console.log({ combo: combobox.selectedItem })
  }, [onChange])

  const clear = useCallback(() => {
    setAppliedKey(null)
    combobox.setValue('')

    onChange({ selected: null })
    menu.hide()
  }, [onChange])

  useEffect(() => {
    // auto applies whenever a new value is selected
    if (combobox.selectedItem) {
      apply()
    }
  }, [combobox.value])

  useEffect(() => {
    // Resets combobox value when menu is closed
    if (!menu.mounted && combobox.value) {
      combobox.setValue(appliedKey || '')
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
  initialApplied?: string
  /** Filter button label. */
  label: string
  items: T[]
}
