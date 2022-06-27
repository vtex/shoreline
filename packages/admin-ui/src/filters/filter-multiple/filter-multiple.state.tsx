import { useState, useCallback, useEffect } from 'react'

import type { ComboboxMultipleState } from '../../combobox'
import { useComboboxMultipleState } from '../../combobox'

import type { AnyObject } from '@vtex/admin-ui-util'
import type { GenericFilterStateReturn } from '../filter/filter.state'

export function useFilterMultipleState<T extends AnyObject>(
  props: UseFilterMultipleStateProps<T>
): UseFilterMultipleReturn<T> {
  const {
    items = [],
    onChange = () => {},
    getOptionLabel = (option) => option.label,
    getOptionId = (option) => option.id,
  } = props

  const [appliedItems, setAppliedItems] = useState<T[]>([])

  const comboboxMultiple = useComboboxMultipleState<T>({
    list: items,
    getOptionValue: getOptionLabel,
    compare: (optionA, optionB) =>
      getOptionId(optionA) === getOptionId(optionB),
  })

  useEffect(() => {
    comboboxMultiple.setSelectedItems([])
  }, [])

  const { selectedItems } = comboboxMultiple

  const updateApplied = useCallback(
    (items: T[]) => {
      comboboxMultiple.setSelectedItems(items)
      setAppliedItems(items)

      onChange({ selected: items })
    },
    [onChange]
  )

  const apply = useCallback(() => {
    setAppliedItems(selectedItems)

    onChange({ selected: selectedItems })
    comboboxMultiple.hide()
  }, [onChange])

  const clear = useCallback(() => {
    comboboxMultiple.clearSelected()

    setAppliedItems([])
    onChange({ selected: [] })
    comboboxMultiple.hide()
  }, [onChange])

  useEffect(() => {
    const isMenuClosed = !comboboxMultiple.mounted
    const hasSelectedItem = comboboxMultiple.value || selectedItems?.length

    if (isMenuClosed && hasSelectedItem) {
      // resets combobox
      comboboxMultiple.setValue('')
      comboboxMultiple.setSelectedItems(appliedItems)
    }
  }, [comboboxMultiple.mounted])

  return {
    combobox: comboboxMultiple,
    onClear: clear,
    onChange: apply,
    items,
    appliedItems,
    setAppliedItems: updateApplied,
    selectedItems,
    getOptionId,
    getOptionLabel,
  }
}

export interface UseFilterMultipleReturn<T>
  extends GenericFilterStateReturn<T> {
  combobox: ComboboxMultipleState<T>
  appliedItems: T[]
  selectedItems: T[]
  setAppliedItems: (items: T[]) => void
}

export interface UseFilterMultipleStateProps<T> {
  // menu: MenuState
  /** Function for getting a label from the option object. */
  getOptionLabel?: (option: T) => string
  /** Function for getting an id from the option object. */
  getOptionId?: (option: T) => string
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: T[] }) => void
  /** List of items to be showed on the list. */
  items?: T[]
}
