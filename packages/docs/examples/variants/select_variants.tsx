import { Select, SelectItem } from '@vtex/shoreline'

export function DefaultSelect() {
  return (
    <Select placeholder="Select an option">
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </Select>
  )
}

export function DisabledSelect() {
  return (
    <Select disabled placeholder="Disabled select">
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </Select>
  )
}

export function SelectWithDefaultValue() {
  return (
    <Select defaultValue="option2">
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </Select>
  )
}
