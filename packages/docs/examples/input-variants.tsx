import { Input, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">States</Text>
      <Input placeholder="Default input" />
      <Input suffix="Suffix" placeholder="With suffix" />
      <Input prefix="Prefix" placeholder="With prefix" />
      <Input prefix="Prefix" suffix="Suffix" placeholder="Both" />
      <Input disabled placeholder="Disabled" />
      <Input error placeholder="Error state" />
    </Stack>
  )
}
