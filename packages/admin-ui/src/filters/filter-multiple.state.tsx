import { useState, useCallback, useEffect } from 'react'

import type { ComboboxMultipleState } from '../combobox'
import { useComboboxMultipleState } from '../combobox'
import { useMenuState } from 'ariakit/menu'
import type { GenericFilterStateReturn, FilterItem } from './filter.state'

export function useFilterMultipleState<T extends FilterItem>(
  props: UseFilterMultipleStateProps<T>
): UseFilterMultipleReturn<T> {
  const { items, label, initialApplied, onChange = () => {} } = props

  const [appliedItems, setAppliedItems] = useState<T[]>(initialApplied || [])

  const comboboxMultiple = useComboboxMultipleState<T>({
    list: items,
    getOptionValue: (op) => op.label,
  })

  useEffect(() => {
    comboboxMultiple.setSelectedItems(initialApplied || [])
  }, [])

  const menu = useMenuState(comboboxMultiple)

  const { selectedItems } = comboboxMultiple

  const apply = useCallback(() => {
    setAppliedItems(selectedItems)

    onChange({ selected: selectedItems.map((i) => i.id) })
    menu.hide()
  }, [onChange])

  const clear = useCallback(() => {
    comboboxMultiple.clearSelected()

    setAppliedItems([])
    onChange({ selected: [] })
    menu.hide()
  }, [onChange])

  useEffect(() => {
    // Resets combobox value when menu is closed
    if (!menu.mounted && (comboboxMultiple.value || selectedItems?.length)) {
      comboboxMultiple.setValue('')
      comboboxMultiple.setSelectedItems(appliedItems)
    }
  }, [menu.mounted])

  return {
    menu,
    combobox: comboboxMultiple,
    onClear: clear,
    onChange: apply,
    items,
    appliedItems,
    appliedKeys: appliedItems.map((i) => i.id),
    selectedKeys: selectedItems.map((i) => i.id) || [],
    label,
  }
}

export interface UseFilterMultipleReturn<T>
  extends GenericFilterStateReturn<T> {
  combobox: ComboboxMultipleState<T>
  appliedItems: T[]
  appliedKeys: string[]
  selectedKeys: string[]
}

export interface UseFilterMultipleStateProps<T> {
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: string[] }) => void
  /** The initial selected keys. */
  initialApplied?: T[]
  /** Filter button label. */
  label: string
  items: T[]
}
