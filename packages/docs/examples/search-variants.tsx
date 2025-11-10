import { Search, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Default</Text>
      <Search />

      <Text variant="emphasis">Loading</Text>
      <Search loading />

      <Text variant="emphasis">Disabled</Text>
      <Search disabled />

      <Text variant="emphasis">Custom Placeholder</Text>
      <Search messages={{ placeholder: 'Search products...' }} />
    </Stack>
  )
}
