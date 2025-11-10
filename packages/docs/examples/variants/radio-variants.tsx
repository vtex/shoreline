import { Radio, RadioGroup, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">States</Text>
      <RadioGroup label="Radio States">
        <Radio value="opt1">Plain</Radio>
        <Radio value="opt2" checked>
          Checked
        </Radio>
        <Radio value="opt3" error>
          Error
        </Radio>
        <Radio value="opt4" disabled>
          Disabled
        </Radio>
        <Radio value="opt5" checked error disabled>
          All states
        </Radio>
      </RadioGroup>
    </Stack>
  )
}
