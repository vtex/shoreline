import { Radio, RadioGroup, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Vertical (Default)</Text>
      <RadioGroup label="Select an option">
        <Radio value="opt1">Option 1</Radio>
        <Radio value="opt2">Option 2</Radio>
        <Radio value="opt3">Option 3</Radio>
      </RadioGroup>

      <Text variant="emphasis">With Description</Text>
      <RadioGroup
        label="Select an option"
        description="Choose one of the options below"
      >
        <Radio value="opt1">Option 1</Radio>
        <Radio value="opt2">Option 2</Radio>
        <Radio value="opt3">Option 3</Radio>
      </RadioGroup>

      <Text variant="emphasis">Horizontal Orientation</Text>
      <RadioGroup label="Select an option" horizontal>
        <Radio value="opt1">Option 1</Radio>
        <Radio value="opt2">Option 2</Radio>
        <Radio value="opt3">Option 3</Radio>
      </RadioGroup>

      <Text variant="emphasis">With Error</Text>
      <RadioGroup
        label="Select an option"
        error
        errorText="Please select an option"
      >
        <Radio value="opt1">Option 1</Radio>
        <Radio value="opt2">Option 2</Radio>
        <Radio value="opt3">Option 3</Radio>
      </RadioGroup>

      <Text variant="emphasis">With Disabled Options</Text>
      <RadioGroup label="Select an option">
        <Radio value="opt1">Available option</Radio>
        <Radio value="opt2" disabled>
          Disabled option
        </Radio>
        <Radio value="opt3">Another available</Radio>
      </RadioGroup>
    </Stack>
  )
}
