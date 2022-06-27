import { useState, useCallback, useEffect } from 'react'

import type { ComboboxState } from '../../combobox/combobox.state'
import { useComboboxState } from '../../combobox/combobox.state'
import type { AnyObject } from '@vtex/admin-ui-util'

export function useFilterState<T extends AnyObject>(
  props: UseFilterStateProps<T>
): UseFilterStateReturn<T> {
  const {
    items = [],
    getOptionLabel = (option) => option.label,
    getOptionId = (option) => option.id,
    onChange = () => {},
  } = props

  const [appliedItem, setAppliedItem] = useState<T>()

  const combobox = useComboboxState({
    virtualFocus: false,
    list: items,
    getOptionValue: getOptionLabel,
  })

  const updateApplied = useCallback(
    (item: T) => {
      combobox.setSelectedItem(item)
      setAppliedItem(item)

      onChange({ selected: item })
    },
    [onChange]
  )

  const apply = useCallback(() => {
    setAppliedItem(combobox.selectedItem)

    onChange({ selected: combobox.selectedItem || null })
    combobox.hide()
  }, [onChange])

  const clear = useCallback(() => {
    setAppliedItem(undefined)

    combobox.setValue('')
    combobox.setSelectedItem(undefined)

    onChange({ selected: null })
    combobox.hide()
  }, [onChange])

  useEffect(() => {
    // auto applies whenever a new value is selected
    if (combobox.selectedItem && combobox.selectedItem !== appliedItem) {
      apply()
    }
  }, [combobox.selectedItem])

  useEffect(() => {
    const isMenuClosed = !combobox.mounted

    if (isMenuClosed && combobox.value) {
      // resets combobox
      combobox.setValue('')
      combobox.setSelectedItem(appliedItem || undefined)
    }
  }, [combobox.mounted])

  return {
    combobox,
    onClear: clear,
    onChange: apply,
    items,
    appliedItem,
    setAppliedItem: updateApplied,
    getOptionLabel,
    getOptionId,
  }
}

export interface GenericFilterStateReturn<T> {
  onClear: () => void
  onChange: () => void
  items: T[]
  combobox: ComboboxState<T>
  getOptionLabel: (option: T) => string
  getOptionId: (option: T) => string
}

export interface UseFilterStateReturn<T> extends GenericFilterStateReturn<T> {
  appliedItem?: T | null
  setAppliedItem: (option: T) => void
}

export interface UseFilterStateProps<T> {
  /** Function for getting an id from the option object. */
  getOptionId?: (option: T) => string
  /** Function for getting a label from the option object. */
  getOptionLabel?: (option: T) => string
  /** Function called when a change is applied. */
  onChange?: ({ selected }: { selected: T | null }) => void
  /** List of items to be showed on the list. */
  items?: T[]
}
