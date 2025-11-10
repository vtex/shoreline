import { Checkbox, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">States</Text>
      <Stack>
        <Checkbox>Default</Checkbox>
        <Checkbox defaultChecked>Checked</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox indeterminate disabled>
          Indeterminate and disabled
        </Checkbox>
      </Stack>
    </Stack>
  )
}
