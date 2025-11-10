import { Checkbox, CheckboxGroup, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Default (Vertical)</Text>
      <CheckboxGroup label="Select options">
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
        <Checkbox value="3">Option 3</Checkbox>
      </CheckboxGroup>

      <Text variant="emphasis">With Description</Text>
      <CheckboxGroup
        label="Select options"
        description="Choose one or more options"
      >
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
        <Checkbox value="3">Option 3</Checkbox>
      </CheckboxGroup>

      <Text variant="emphasis">Horizontal Orientation</Text>
      <CheckboxGroup label="Select options" horizontal>
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
        <Checkbox value="3">Option 3</Checkbox>
      </CheckboxGroup>

      <Text variant="emphasis">With Error</Text>
      <CheckboxGroup
        label="Select options"
        error
        errorText="Please select at least one option"
      >
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
        <Checkbox value="3">Option 3</Checkbox>
      </CheckboxGroup>

      <Text variant="emphasis">Horizontal with Error</Text>
      <CheckboxGroup
        label="Select options"
        horizontal
        error
        errorText="Please select at least one option"
      >
        <Checkbox value="1">Option 1</Checkbox>
        <Checkbox value="2">Option 2</Checkbox>
        <Checkbox value="3">Option 3</Checkbox>
      </CheckboxGroup>

      <Text variant="emphasis">With Indeterminate and Disabled States</Text>
      <CheckboxGroup label="Select options">
        <Checkbox value="1" indeterminate>
          All options
        </Checkbox>
        <Checkbox value="2">Option 1</Checkbox>
        <Checkbox value="3">Option 2</Checkbox>
        <Checkbox value="4" disabled>
          Option 3 (disabled)
        </Checkbox>
      </CheckboxGroup>
    </Stack>
  )
}
