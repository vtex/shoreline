import { Select, SelectItem } from '@vtex/shoreline'

export default function Example() {
  return (
    <Select
      messages={{
        placeholder: 'Select a fruit from the list',
      }}
    >
      <SelectItem value="Apple">Apple</SelectItem>
      <SelectItem value="Banana">Banana</SelectItem>
      <SelectItem value="Grape">Grape</SelectItem>
    </Select>
  )
}
