import { useState, useCallback, useEffect } from 'react'

import type { ComboboxMultipleState } from '../combobox'
import { useComboboxMultipleState } from '../combobox'
import { useMenuState } from 'ariakit/menu'
import type { GenericFilterStateReturn } from './filter.state'
import type { AnyObject } from 'packages/admin-ui-util'

export function useFilterMultipleState<T extends AnyObject>(
  props: UseFilterMultipleStateProps<T>
): UseFilterMultipleReturn<T> {
  const {
    items,
    label,
    initialApplied,
    baseId,
    onChange = () => {},
    getOptionLabel = (option) => option.label,
    getOptionId = (option) => option.id,
  } = props

  const [appliedItems, setAppliedItems] = useState<T[]>(initialApplied || [])

  const comboboxMultiple = useComboboxMultipleState<T>({
    list: items,
    getOptionValue: getOptionLabel,
    compare: (optionA, optionB) =>
      getOptionId(optionA) === getOptionId(optionB),
  })

  useEffect(() => {
    comboboxMultiple.setSelectedItems(initialApplied || [])
  }, [])

  const menu = useMenuState(comboboxMultiple)

  const { selectedItems } = comboboxMultiple

  const apply = useCallback(() => {
    setAppliedItems(selectedItems)

    onChange({ selected: selectedItems })
    menu.hide()
  }, [onChange])

  const clear = useCallback(() => {
    comboboxMultiple.clearSelected()

    setAppliedItems([])
    onChange({ selected: [] })
    menu.hide()
  }, [onChange])

  useEffect(() => {
    const isMenuClosed = !menu.mounted
    const hasSelectedItem = comboboxMultiple.value || selectedItems?.length

    if (isMenuClosed && hasSelectedItem) {
      // resets combobox
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
    selectedItems,
    label,
    baseId,
    getOptionId,
    getOptionLabel,
  }
}

export interface UseFilterMultipleReturn<T>
  extends GenericFilterStateReturn<T> {
  combobox: ComboboxMultipleState<T>
  appliedItems: T[]
  selectedItems: T[]
}

export interface UseFilterMultipleStateProps<T> {
  /** Function for getting a label from the option object. */
  getOptionLabel?: (option: T) => string
  /** Function for getting an id from the option object. */
  getOptionId?: (option: T) => string
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: T[] }) => void
  /** The initial selected keys. */
  initialApplied?: T[]
  /** Filter button label. */
  label: string
  /** Base for component and it's children id. */
  baseId?: string
  /** List of items to be showed on the list. */
  items: T[]
}
