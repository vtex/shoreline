import { useEffect } from 'react'

import { useCheckboxState } from 'ariakit/checkbox'
import { useComboboxState } from './combobox.state'

type Props = {
  list?: string[]
  defaultSelected?: string[]
}

export function useComboboxMultipleState(props: Props = {}) {
  const { defaultSelected, list } = props

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

  // Reset the combobox value whenever an item is checked or unchecked.
  useEffect(() => {
    combobox.setValue('')
  }, [checkbox.value, combobox.setValue])

  return {
    selected: checkbox.value,
    setSelected: checkbox.setValue,
    ...combobox,
  }
}
