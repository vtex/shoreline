import React, { startTransition, useMemo, useState } from 'react'

import {
  Select,
  SelectItem,
  SelectItemCheck,
  SelectList,
  SelectPopover,
  SelectProvider,
  SelectTrigger,
} from '../index'
import { Field, FieldDescription, FieldError } from '../../field'
import { Label } from '../../label'
import { Button } from '../../button'
import { Flex } from '../../flex'
import { matchSorter } from 'match-sorter'
import {
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxProvider,
} from '@vtex/shoreline-primitives'

export default {
  title: 'components/select/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Simple() {
  return (
    <Select>
      <SelectItem value="Apple">Apple</SelectItem>
      <SelectItem value="Banana">Banana</SelectItem>
      <SelectItem value="Grape">Grape</SelectItem>
    </Select>
  )
}

export function Disabled() {
  return (
    <Select disabled>
      <SelectItem value="Apple">Apple</SelectItem>
      <SelectItem value="Banana">Banana</SelectItem>
      <SelectItem value="Grape">Grape</SelectItem>
    </Select>
  )
}

export function Controlled() {
  const [value, setValue] = useState<string | string[]>('Apple')

  return (
    <div>
      <div>Selected: {value}</div>
      <Select value={value} setValue={setValue}>
        <SelectItem value="Apple">Apple</SelectItem>
        <SelectItem value="Banana">Banana</SelectItem>
        <SelectItem value="Grape">Grape</SelectItem>
      </Select>
    </div>
  )
}

export function Multi() {
  const [value, setValue] = useState<string | string[]>([])

  return (
    <Select value={value} setValue={setValue}>
      <SelectItem value="Apple">Apple</SelectItem>
      <SelectItem value="Banana">Banana</SelectItem>
      <SelectItem value="Grape">Grape</SelectItem>
    </Select>
  )
}

export function AsField() {
  return (
    <Field>
      <Label>Favorite fruit</Label>
      <Select>
        <SelectItem value="Apple">Apple</SelectItem>
        <SelectItem value="Banana">Banana</SelectItem>
        <SelectItem value="Grape">Grape</SelectItem>
      </Select>
      <FieldDescription>The fruit you most like eating</FieldDescription>
    </Field>
  )
}

export function Error() {
  return (
    <Field error>
      <Label>Favorite fruit</Label>
      <Select>
        <SelectItem value="Apple">Apple</SelectItem>
        <SelectItem value="Banana">Banana</SelectItem>
        <SelectItem value="Grape">Grape</SelectItem>
      </Select>
      <FieldDescription>The fruit you most like eating</FieldDescription>
      <FieldError>Something went wrong</FieldError>
    </Field>
  )
}

export function Composition() {
  const [value, setValue] = useState('')

  return (
    <SelectProvider value={value} setValue={setValue}>
      <SelectTrigger asChild>
        <Button>Select: {value}</Button>
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

export function ListBox() {
  const [value, setValue] = useState('')

  return (
    <div>
      <div>Selected Value: {value}</div>
      <SelectProvider value={value} setValue={setValue}>
        <SelectList
          aria-label="select company"
          alwaysVisible
          style={{
            border: '1px solid black',
            display: 'inline-flex',
            flexDirection: 'column',
            padding: '0.5rem',
          }}
        >
          <SelectItem value="apple" asChild>
            <Flex gap="$space-1" align="center">
              <SelectItemCheck /> Apple
            </Flex>
          </SelectItem>
          <SelectItem value="google" asChild>
            <Flex gap="$space-1" align="center">
              <SelectItemCheck /> Google
            </Flex>
          </SelectItem>
          <SelectItem value="microsoft" asChild>
            <Flex gap="$space-1" align="center">
              <SelectItemCheck /> Microsoft
            </Flex>
          </SelectItem>
          <SelectItem value="amazon" asChild>
            <Flex gap="$space-1" align="center">
              <SelectItemCheck /> Amazon
            </Flex>
          </SelectItem>
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
