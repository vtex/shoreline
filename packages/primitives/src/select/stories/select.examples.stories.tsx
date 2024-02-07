import React, { startTransition, useMemo, useState } from 'react'
import { matchSorter } from 'match-sorter'

import {
  SelectProvider,
  SelectTrigger,
  SelectItem,
  SelectPopover,
  SelectList,
  SelectItemCheck,
} from '../index'

import {
  ComboboxInput,
  ComboboxProvider,
  ComboboxList,
  ComboboxItem,
} from '../../combobox'

export default {
  title: 'primitives/select/examples',
  parameters: {
    chormatic: {
      disableSnapshot: true,
    },
  },
}

export function Composition() {
  const [value, setValue] = useState('')

  return (
    <SelectProvider value={value} setValue={setValue}>
      <SelectTrigger asChild>
        <button>Select: {value}</button>
      </SelectTrigger>
      <SelectPopover>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="google">Google</SelectItem>
        <SelectItem value="microsoft">Microsoft</SelectItem>
        <SelectItem value="amazon">Amazon</SelectItem>
      </SelectPopover>
    </SelectProvider>
  )
}

export function Multiselect() {
  const [value, setValue] = useState([])

  return (
    <SelectProvider value={value} setValue={setValue}>
      <SelectTrigger>Select: {value.length} Items</SelectTrigger>
      <SelectPopover>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="google">Google</SelectItem>
        <SelectItem value="microsoft">Microsoft</SelectItem>
        <SelectItem value="amazon">Amazon</SelectItem>
      </SelectPopover>
    </SelectProvider>
  )
}

export function ListBox() {
  const [value, setValue] = useState('')

  return (
    <div>
      <span>Selected Value: {value}</span>
      <SelectProvider value={value} setValue={setValue}>
        <SelectList aria-label="select companies" alwaysVisible>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="google">Google</SelectItem>
          <SelectItem value="microsoft">Microsoft</SelectItem>
          <SelectItem value="amazon">Amazon</SelectItem>
        </SelectList>
      </SelectProvider>
    </div>
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

export function WithCombobox() {
  const [value, setValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const matches = useMemo<string[]>(() => {
    return matchSorter(fruitList, searchValue)
  }, [searchValue])

  return (
    <ComboboxProvider
      resetValueOnHide
      setValue={(value) => {
        startTransition(() => {
          setSearchValue(value)
        })
      }}
    >
      <SelectProvider value={value} setValue={setValue}>
        <SelectTrigger>Select: {value}</SelectTrigger>
        <SelectPopover>
          <div>
            <ComboboxInput autoSelect placeholder="Search..." />
          </div>
          <ComboboxList>
            {matches.length ? (
              matches.map((value) => (
                <SelectItem key={value} value={value} asChild>
                  <ComboboxItem>
                    {value} <SelectItemCheck />
                  </ComboboxItem>
                </SelectItem>
              ))
            ) : (
              <div>No results found</div>
            )}
          </ComboboxList>
        </SelectPopover>
      </SelectProvider>
    </ComboboxProvider>
  )
}
