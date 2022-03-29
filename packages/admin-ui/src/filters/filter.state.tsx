import { useState, useCallback, useEffect } from 'react'

import { useMenuState } from 'ariakit/menu'
import { useComboboxState } from 'ariakit'

export function useFilterState<T extends FilterItem>(
  props: UseFilterStateProps<T>
): UseFilterStateReturn<T> {
  const { items, label, initialApplied, onChange = () => {} } = props

  const [selectedKey, setSelectedKey] = useState(initialApplied)
  const [appliedKey, setAppliedKey] = useState(initialApplied || null)

  const combobox = useComboboxState({
    virtualFocus: false,
    value: selectedKey,
    setValue: (value) => {
      setSelectedKey(value)
      // remove below to apply values only when apply button is clicked
      setAppliedKey(value)
      onChange({ selected: value })
      menu.hide()
    },
  })

  const menu = useMenuState({ ...combobox, gutter: 4 })

  const apply = useCallback(() => {
    const selected = combobox.value

    setAppliedKey(selected)
    onChange({ selected })
    menu.hide()
  }, [onChange])

  const clear = useCallback(() => {
    setAppliedKey(null)
    combobox.setValue('')

    onChange({ selected: null })
    menu.hide()
  }, [onChange])

  useEffect(() => {
    // Resets combobox value when menu is closed
    if (!menu.mounted && combobox.value) {
      combobox.setValue(appliedKey || '')
    }
  }, [menu.mounted])

  // TO DO this won't work for searcheable later
  const appliedItem = items.find((item) => item.id === appliedKey)

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
  combobox: any
}

export interface UseFilterStateReturn<T> extends GenericFilterStateReturn<T> {
  appliedItem?: T | null
  appliedKey: string | null
  combobox: any
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
