import '../../../dist/styles.min.css'
import '../select.css'
import React, { startTransition, useMemo, useState } from 'react'
import { matchSorter } from 'match-sorter'

import {
  SelectProvider,
  Select,
  SelectOption,
  SelectPopover,
  SelectList,
  SelectOptionCheck,
} from '../index'
import { Button } from '../../button'
import { Stack } from '../../stack'
import { Text } from '../../text'
import {
  Combobox,
  ComboboxProvider,
  ComboboxList,
  ComboboxItem,
} from '../../combobox'

export default {
  title: 'shoreline-components/select',
}

export function Default() {
  const [value, setValue] = useState('')

  return (
    <SelectProvider value={value} setValue={setValue}>
      <Select>Select: {value}</Select>
      <SelectPopover>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="google">Google</SelectOption>
        <SelectOption value="microsoft">Microsoft</SelectOption>
        <SelectOption value="amazon">Amazon</SelectOption>
      </SelectPopover>
    </SelectProvider>
  )
}

export function Composition() {
  const [value, setValue] = useState('')

  return (
    <SelectProvider value={value} setValue={setValue}>
      <Select asChild>
        <Button>Select: {value}</Button>
      </Select>
      <SelectPopover>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="google">Google</SelectOption>
        <SelectOption value="microsoft">Microsoft</SelectOption>
        <SelectOption value="amazon">Amazon</SelectOption>
      </SelectPopover>
    </SelectProvider>
  )
}

export function Multiselect() {
  const [value, setValue] = useState([])

  return (
    <SelectProvider value={value} setValue={setValue}>
      <Select>Select: {value.length} Items</Select>
      <SelectPopover>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="google">Google</SelectOption>
        <SelectOption value="microsoft">Microsoft</SelectOption>
        <SelectOption value="amazon">Amazon</SelectOption>
      </SelectPopover>
    </SelectProvider>
  )
}

export function ListBox() {
  const [value, setValue] = useState('')

  return (
    <Stack>
      <Text>Selected Value: {value}</Text>
      <SelectProvider value={value} setValue={setValue} open>
        <SelectList>
          <SelectOption value="apple">Apple</SelectOption>
          <SelectOption value="google">Google</SelectOption>
          <SelectOption value="microsoft">Microsoft</SelectOption>
          <SelectOption value="amazon">Amazon</SelectOption>
        </SelectList>
      </SelectProvider>
    </Stack>
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
        <Select>Select: {value}</Select>
        <SelectPopover>
          <div>
            <Combobox autoSelect placeholder="Search..." />
          </div>
          <ComboboxList>
            {matches.length ? (
              matches.map((value) => (
                <SelectOption key={value} value={value} asChild>
                  <ComboboxItem>
                    {value} <SelectOptionCheck />
                  </ComboboxItem>
                </SelectOption>
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
