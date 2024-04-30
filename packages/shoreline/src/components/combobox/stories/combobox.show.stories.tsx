import React from 'react'

import {
  ComboboxInput,
  ComboboxPopover,
  ComboboxProvider,
  ComboboxItem,
} from '../index'

export default {
  title: 'primitives/combobox',
}

export function Show() {
  return (
    <ComboboxProvider>
      <label>
        Select a fruit
        <ComboboxInput placeholder="e.g., Apple" />
      </label>
      <ComboboxPopover>
        <ComboboxItem value="apple">🍎 Apple</ComboboxItem>
        <ComboboxItem value="grape">🍇 Grape</ComboboxItem>
        <ComboboxItem value="orange">🍊 Orange</ComboboxItem>
        <ComboboxItem value="strawberry">🍓 Strawberry</ComboboxItem>
        <ComboboxItem value="watermelon">🍉 Watermelon</ComboboxItem>
      </ComboboxPopover>
    </ComboboxProvider>
  )
}
