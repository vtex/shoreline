import { useCallback, useEffect } from 'react'
import { useCheckboxState } from 'ariakit/checkbox'

import type { ComboboxStateProps } from './combobox.state'
import { useComboboxState } from './combobox.state'

export function useComboboxMultipleState(
  props: ComboboxMultipleStateProps = {}
) {
  const { defaultSelected = [], list, shouldClearOnSelect = true } = props

  const combobox = useComboboxState({
    // VoiceOver has issues with multi-selectable comboboxes where the DOM focus
    // is on the combobox input, so we set `virtualFocus` to `false` to disable
    // this behavior and put DOM focus on the items.
    virtualFocus: false,
    list,
  })

  const checkbox = useCheckboxState({
    defaultValue: defaultSelected,
  })

  const clearSelected = useCallback(() => {
    combobox.setValue('')
    checkbox.setValue([])
  }, [checkbox.setValue, combobox.setValue])

  const removeSelected = useCallback(
    (value: string) => {
      checkbox.setValue((values: string[]) =>
        values.filter((currentValue) => currentValue !== value)
      )
    },
    [checkbox]
  )

  useEffect(() => {
    if (shouldClearOnSelect) combobox.setValue('')
  }, [checkbox.value, shouldClearOnSelect, combobox.setValue])

  return {
    selected: checkbox.value,
    setSelected: checkbox.setValue,
    removeSelected,
    clearSelected,
    ...combobox,
  }
}

export type ComboboxMultipleStateProps = ComboboxStateProps & {
  defaultSelected?: string[]
  shouldClearOnSelect?: boolean
}
