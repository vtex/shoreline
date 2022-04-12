import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useCallback, useEffect } from 'react'

import type { ComboboxState, ComboboxStateProps } from './combobox.state'
import { useComboboxState } from './combobox.state'
import { useCheckboxObjectState } from './selected-multiple.state'

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

  const combobox = useComboboxState<T>({
    // VoiceOver has issues with multi-selectable comboboxes where the DOM focus
    // is on the combobox input, so we set `virtualFocus` to `false` to disable
    // this behavior and put DOM focus on the items.
    virtualFocus: false,
    list,
  })

  const checkbox = useCheckboxObjectState({
    defaultValue: defaultSelected,
    compare: (a, b) => getOptionValue(a) === getOptionValue(b),
  })

  const clearSelected = useCallback(() => {
    combobox.setValue('')
    checkbox.setValue([])
  }, [checkbox.setValue, combobox.setValue])

  const addSelectedItem = (newItem: T) => checkbox.select(newItem)

  const removeSelectedItem = (removedItem: T) => checkbox.unselect(removedItem)

  useEffect(() => {
    if (shouldClearOnSelect) combobox.setValue('')
  }, [checkbox.value, shouldClearOnSelect, combobox.setValue])

  return {
    ...combobox,
    selectedItems: checkbox.value,
    setSelectedItems: checkbox.setValue,
    onChange: checkbox.toggle,
    isSelected: checkbox.isSelected,
    addSelectedItem,
    removeSelectedItem,
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
  setSelectedItems: Dispatch<SetStateAction<T[]>>
  clearSelected: () => void
  addSelectedItem: (item: T) => void
  removeSelectedItem: (item: T) => void
  onChange: (item: T) => void
  isSelected: (item: T) => boolean
}
