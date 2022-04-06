import type { ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import type { CheckboxState } from 'ariakit/checkbox'
import { useCheckboxState } from 'ariakit/checkbox'

import type { ComboboxState, ComboboxStateProps } from './combobox.state'
import { useComboboxState } from './combobox.state'

export function useComboboxMultipleState<T>(
  props: ComboboxMultipleStateProps<T> = {}
): ComboboxMultipleState<T> {
  const {
    defaultSelected = [],
    list,
    shouldClearOnSelect = true,
    getOptionValue = (item: T) =>
      typeof item === 'string' ? item : JSON.stringify(item),
    renderOption = (item: T) =>
      typeof item === 'string' ? item : JSON.stringify(item),
    renderTag: originalRenderTag,
  } = props

  const renderTag = originalRenderTag || renderOption

  const [selectedItems, setSelectedItems] = useState(defaultSelected)

  // convert object array into simple array
  const simplifiedDefaultSelected = defaultSelected.map((item) =>
    getOptionValue(item)
  )

  const combobox = useComboboxState<T>({
    // VoiceOver has issues with multi-selectable comboboxes where the DOM focus
    // is on the combobox input, so we set `virtualFocus` to `false` to disable
    // this behavior and put DOM focus on the items.
    virtualFocus: false,
    list,
  })

  const checkbox = useCheckboxState({
    defaultValue: simplifiedDefaultSelected,
  })

  const clearSelected = useCallback(() => {
    combobox.setValue('')
    setSelectedItems([])
    checkbox.setValue([])
  }, [checkbox.setValue, combobox.setValue])

  const unselect = useCallback(
    (value: string) => {
      const newVal = selectedItems.filter(
        (currentValue) => getOptionValue(currentValue) !== value
      )

      setSelectedItems(newVal)
      checkbox.setValue(newVal.map((i) => getOptionValue(i)))
    },
    [checkbox]
  )

  const addSelectedItem = (newItem: T) => {
    setSelectedItems((oldVal) => [...oldVal, newItem])
  }

  const removeSelectedItem = (removedItem: T) => {
    setSelectedItems((oldValues) => {
      return oldValues.filter(
        (currentValue) =>
          getOptionValue(currentValue) !== getOptionValue(removedItem)
      )
    })
  }

  useEffect(() => {
    if (shouldClearOnSelect) combobox.setValue('')
  }, [checkbox.value, shouldClearOnSelect, combobox.setValue])

  return {
    ...combobox,
    checkboxState: checkbox,
    selectedItems,
    addSelectedItem,
    removeSelectedItem,
    unselect,
    clearSelected,
    getOptionValue,
    renderOption,
    renderTag,
  }
}

export interface ComboboxMultipleStateProps<T> extends ComboboxStateProps<T> {
  defaultSelected?: T[]
  renderTag?: (item: T) => ReactNode
  shouldClearOnSelect?: boolean
}

export interface ComboboxMultipleState<T> extends ComboboxState<T> {
  renderTag: (item: T) => ReactNode
  selectedItems: T[]
  checkboxState: CheckboxState<string[]>
  unselect: (value: string) => void
  clearSelected: () => void
  addSelectedItem: (item: T) => void
  removeSelectedItem: (item: T) => void
}
