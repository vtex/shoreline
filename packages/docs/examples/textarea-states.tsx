import { Textarea, Stack } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack>
      <Textarea maxLength={120} resizable={false} />
      <Textarea maxLength={120} optional resizable={false} />
      <Textarea maxLength={120} resizable={true} />
      <Textarea maxLength={120} error={true} resizable={false} />
    </Stack>
  )
}
