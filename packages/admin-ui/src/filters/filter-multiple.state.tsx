import { useState, useCallback, useEffect } from 'react'

import { useComboboxMultipleState } from '../combobox'
import { useMenuState } from 'ariakit/menu'
import type { GenericFilterStateReturn, FilterItem } from './filter.state'

export function useFilterMultipleState<T extends FilterItem>(
  props: UseFilterMultipleStateProps<T>
): UseFilterMultipleReturn<T> {
  const { items, label, initialApplied, onChange = () => {} } = props

  const comboboxMultiple = useComboboxMultipleState({
    defaultSelected: initialApplied,
  })

  const menu = useMenuState(comboboxMultiple)

  const { selectedItems } = comboboxMultiple

  const [appliedKeys, setAppliedKeys] = useState<string[]>(initialApplied || [])

  const apply = useCallback(() => {
    setAppliedKeys(selectedItems)
    onChange({ selected: selectedItems })
    menu.hide()
  }, [onChange])

  const clear = useCallback(() => {
    setAppliedKeys([])
    comboboxMultiple.clearSelected()

    onChange({ selected: [] })
    menu.hide()
  }, [onChange])

  useEffect(() => {
    // Resets combobox value when menu is closed
    if (!menu.mounted && (comboboxMultiple.value || selectedItems?.length)) {
      comboboxMultiple.setValue('')
      comboboxMultiple.setSelectedItems(appliedKeys)
    }
  }, [menu.mounted])

  // TO DO this won't work for searcheable later
  const appliedItems = appliedKeys.map((key) =>
    items.find(({ id }) => id === key)
  ) as T[]

  return {
    menu,
    combobox: comboboxMultiple,
    checkbox: {
      // TODO Fix nested components issues
      // maybe export checkboxstate from hook?
      value: selected,
      setValue: comboboxMultiple.setSelected,
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

export interface UseFilterMultipleReturn<T>
  extends GenericFilterStateReturn<T> {
  checkbox: any
  appliedItems: T[]
  appliedKeys: string[]
  selectedKeys: string[]
}

export interface UseFilterMultipleStateProps<T> {
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: string[] }) => void
  /** The initial selected keys. */
  initialApplied?: string[]
  /** Filter button label. */
  label: string
  items: T[]
}
