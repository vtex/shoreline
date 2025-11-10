import { TimeInput, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Default Time Input</Text>
      <TimeInput />

      <Text variant="emphasis">With Placeholder</Text>
      <TimeInput placeholder="Select time" />

      <Text variant="emphasis">Disabled State</Text>
      <TimeInput disabled />

      <Text variant="emphasis">With Error</Text>
      <TimeInput error />
    </Stack>
  )
}
