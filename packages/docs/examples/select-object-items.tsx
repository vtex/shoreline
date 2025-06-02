import {
  SelectItem,
  SelectPopover,
  SelectProvider,
  SelectTrigger,
} from '@vtex/shoreline'
import { useState } from 'react'

const fruitList = [
  { label: 'Apple 🍎', id: 'id_1' },
  { label: 'Banana 🍌', id: 'id_2' },
  { label: 'Cherry 🍒', id: 'id_3' },
  { label: 'Grape 🍇', id: 'id_4' },
  { label: 'Green apple 🍏', id: 'id_5' },
]

export default function Example() {
  const [value, setValue] = useState<string | string[]>('Apple')
  const placeholder = 'Select a fruit'

  return (
    <div data-sl-select>
      <SelectProvider value={value} setValue={setValue}>
        <SelectTrigger data-sl-select-button>
          {fruitList.find((bind) => bind.id === value)?.label || placeholder}
        </SelectTrigger>
        <SelectPopover sameWidth unmountOnHide hideOnInteractOutside gutter={4}>
          {fruitList.map((binding) => (
            <SelectItem key={binding.id} value={binding.id}>
              {binding.label}
            </SelectItem>
          ))}
        </SelectPopover>
      </SelectProvider>
    </div>
  )
}
