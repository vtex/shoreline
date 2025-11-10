import { Select, SelectItem, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Standard Select</Text>
      <Select>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
        <SelectItem value="option4">Option 4</SelectItem>
      </Select>

      <Text variant="emphasis">With Many Options</Text>
      <Select>
        <SelectItem value="opt1">Apple</SelectItem>
        <SelectItem value="opt2">Banana</SelectItem>
        <SelectItem value="opt3">Cherry</SelectItem>
        <SelectItem value="opt4">Date</SelectItem>
        <SelectItem value="opt5">Elderberry</SelectItem>
        <SelectItem value="opt6">Fig</SelectItem>
        <SelectItem value="opt7">Grape</SelectItem>
        <SelectItem value="opt8">Honeydew</SelectItem>
      </Select>

      <Text variant="emphasis">Few Options</Text>
      <Select>
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </Select>
    </Stack>
  )
}
