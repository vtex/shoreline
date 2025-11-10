import { Textarea, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">States</Text>
      <Textarea
        placeholder="Default textarea"
        maxLength={120}
        resizable={false}
      />
      <Textarea
        placeholder="Optional"
        maxLength={120}
        optional
        resizable={false}
      />
      <Textarea placeholder="Resizable" maxLength={120} resizable={true} />
      <Textarea
        placeholder="Error state"
        maxLength={120}
        error={true}
        resizable={false}
      />
    </Stack>
  )
}
