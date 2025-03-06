import { Input, Stack } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack>
      <Input suffix="Suffix" />
      <Input prefix="Prefix" />
      <Input prefix="Prefix" suffix="Suffix" />
      <Input disabled />
      <Input error />
    </Stack>
  )
}
