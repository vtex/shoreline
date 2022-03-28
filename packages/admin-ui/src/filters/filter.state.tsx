import { useState, useCallback, useEffect } from 'react'

import { useMenuState } from 'ariakit/menu'
import type { FilterItem, Key } from './filter-multiple.state'
import { useComboboxState } from 'ariakit'

export function useFilterState(
  props: UseFilterStateProps
): UseFilterStateReturn {
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

  const menu = useMenuState(combobox)

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

export interface GenericFilterStateReturn {
  menu: any
  onClear: () => void
  onChange: () => void
  label: string
  items: FilterItem[]
  combobox: any
}

export interface UseFilterStateReturn extends GenericFilterStateReturn {
  appliedItem?: FilterItem | null
  appliedKey: Key | null
  combobox: any
}

export interface UseFilterStateProps {
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: Key | null }) => void
  /** The initial selected key. */
  initialApplied?: Key
  /** Filter button label. */
  label: string
  items: FilterItem[]
}
