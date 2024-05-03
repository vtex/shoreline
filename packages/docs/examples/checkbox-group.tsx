import { Checkbox, CheckboxGroup } from '@vtex/shoreline'

export default function Example() {
  return (
    <CheckboxGroup label="Checkbox group">
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
    </CheckboxGroup>
  )
}
