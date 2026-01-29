import { Checkbox, CheckboxGroup } from '@vtex/shoreline'

export function DefaultCheckboxGroup() {
  return (
    <CheckboxGroup label="Checkbox group">
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </CheckboxGroup>
  )
}

export function HorizontalCheckboxGroup() {
  return (
    <CheckboxGroup label="Horizontal checkbox group" horizontal>
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </CheckboxGroup>
  )
}

export function CheckboxGroupWithError() {
  return (
    <CheckboxGroup
      label="Checkbox group with error"
      error
      errorText="Something is wrong"
    >
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </CheckboxGroup>
  )
}

export function CheckboxGroupWithDescription() {
  return (
    <CheckboxGroup
      label="Checkbox group with description"
      description="Please select all that apply"
    >
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </CheckboxGroup>
  )
}

export function HorizontalCheckboxGroupWithError() {
  return (
    <CheckboxGroup
      label="Horizontal checkbox group with error"
      horizontal
      error
      errorText="Something is wrong"
    >
      <Checkbox value="1">Option 1</Checkbox>
      <Checkbox value="2">Option 2</Checkbox>
      <Checkbox value="3">Option 3</Checkbox>
    </CheckboxGroup>
  )
}
