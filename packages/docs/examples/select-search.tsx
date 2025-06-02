import {
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxProvider,
  SelectItem,
  SelectItemCheck,
  SelectPopover,
  SelectProvider,
  SelectTrigger,
} from '@vtex/shoreline'
import { startTransition, useMemo, useState } from 'react'
import { matchSorter } from 'match-sorter'

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

export default function Example() {
  const [value, setValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const placeholder = 'Select a fruit'

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
      <div data-sl-select>
        <SelectProvider value={value} setValue={setValue}>
          <SelectTrigger data-sl-select-button>
            {value || placeholder}
          </SelectTrigger>
          <SelectPopover>
            <div>
              <ComboboxInput
                data-sl-search
                autoSelect
                placeholder="Search..."
              />
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
      </div>
    </ComboboxProvider>
  )
}
