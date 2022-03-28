import { useState, useCallback, useEffect } from 'react'

import { useComboboxMultipleState } from '../combobox'
import { useMenuState } from 'ariakit/menu'
import type { GenericFilterStateReturn } from './filter.state'

export function useFilterMultipleState(
  props: UseFilterMultipleStateProps
): UseFilterMultipleReturn {
  const { items, label, initialApplied, onChange = () => {} } = props

  const combobox = useComboboxMultipleState({ defaultSelected: initialApplied })
  const menu = useMenuState(combobox)

  const { selected } = combobox

  const [appliedKeys, setAppliedKeys] = useState<Key[]>(initialApplied || [])

  const apply = useCallback(() => {
    setAppliedKeys(selected)
    onChange({ selected })
    menu.hide()
  }, [onChange])

  const clear = useCallback(() => {
    setAppliedKeys([])
    combobox.setSelected([])

    onChange({ selected: [] })
    menu.hide()
  }, [onChange])

  useEffect(() => {
    // Resets combobox value when menu is closed
    if (!menu.mounted && (combobox.value || selected?.length)) {
      combobox.setValue('')
      combobox.setSelected(appliedKeys)
    }
  }, [menu.mounted])

  // TO DO this won't work for searcheable later
  const appliedItems = appliedKeys.map((key) =>
    items.find(({ id }) => id === key)
  ) as FilterItem[]

  return {
    menu,
    combobox,
    checkbox: {
      // TODO Fix nested components issues
      // maybe export checkboxstate from hook?
      value: selected,
      setValue: combobox.setSelected,
    },
    onClear: clear,
    onChange: apply,
    items,
    appliedItems,
    appliedKeys,
    selectedKeys: selected || [],
    label,
  }
}

export type Key = string

export interface FilterItem {
  id: Key
  label: string
  [x: string]: unknown
}

export interface UseFilterMultipleReturn extends GenericFilterStateReturn {
  checkbox: any
  appliedItems: FilterItem[]
  appliedKeys: Key[]
  selectedKeys: Key[]
}

export interface UseFilterMultipleStateProps {
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: Key[] }) => void
  /** The initial selected keys. */
  initialApplied?: Key[]
  /** Filter button label. */
  label: string
  items: FilterItem[]
}
