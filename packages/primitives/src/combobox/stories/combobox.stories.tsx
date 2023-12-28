import React, { startTransition, useMemo, useState } from 'react'
import { matchSorter } from 'match-sorter'

import {
  Combobox,
  ComboboxPopover,
  ComboboxProvider,
  ComboboxItem,
} from '../index'

export default {
  title: 'primitives/combobox',
}

export function Default() {
  return (
    <ComboboxProvider>
      <label>
        Select a fruit
        <Combobox placeholder="e.g., Apple" />
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

const fruitList = [
  'Apple',
  'Bacon',
  'Banana',
  'Broccoli',
  'Burger',
  'Cake',
  'Candy',
  'Carrot',
  'Cherry',
  'Chocolate',
  'Cookie',
  'Cucumber',
  'Donut',
  'Fish',
  'Fries',
  'Grape',
  'Green apple',
  'Hot dog',
  'Ice cream',
  'Kiwi',
  'Lemon',
  'Lollipop',
  'Onion',
  'Orange',
  'Pasta',
  'Pineapple',
  'Pizza',
  'Potato',
  'Salad',
  'Sandwich',
  'Steak',
  'Strawberry',
  'Tomato',
  'Watermelon',
]

export function Filtering() {
  const [searchValue, setSearchValue] = useState('')

  const matches = useMemo(
    () => matchSorter(fruitList, searchValue),
    [searchValue]
  )

  return (
    <ComboboxProvider
      setValue={(value) => {
        startTransition(() => setSearchValue(value))
      }}
    >
      <label>
        Select a fruit
        <Combobox placeholder="e.g., Apple" />
      </label>
      <ComboboxPopover>
        {matches.length ? (
          matches.map((value) => (
            <ComboboxItem key={value} value={value}>
              {value}
            </ComboboxItem>
          ))
        ) : (
          <div>No results found</div>
        )}
      </ComboboxPopover>
    </ComboboxProvider>
  )
}