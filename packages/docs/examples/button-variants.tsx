import { Button, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Variants</Text>
      <Stack horizontal>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="critical">Critical</Button>
        <Button variant="criticalTertiary">Critical Tertiary</Button>
      </Stack>

      <Text variant="emphasis">Sizes</Text>
      <Stack horizontal>
        <Button size="normal">Normal</Button>
        <Button size="large">Large</Button>
      </Stack>
    </Stack>
  )
}
