import { Spinner, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Default Size (16px)</Text>
      <Spinner description="Loading" />

      <Text variant="emphasis">Small (12px)</Text>
      <Spinner description="Loading" size={12} />

      <Text variant="emphasis">Medium (24px)</Text>
      <Spinner description="Loading" size={24} />

      <Text variant="emphasis">Large (32px)</Text>
      <Spinner description="Loading" size={32} />

      <Text variant="emphasis">Extra Large (48px)</Text>
      <Spinner description="Loading" size={48} />

      <Text variant="emphasis">Custom Description</Text>
      <Spinner description="Processing your request" size={24} />
    </Stack>
  )
}
