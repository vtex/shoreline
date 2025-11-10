import { IconButton, IconTrash, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Variants</Text>
      <Stack horizontal>
        <IconButton label="Delete" variant="primary">
          <IconTrash />
        </IconButton>
        <IconButton label="Delete" variant="secondary">
          <IconTrash />
        </IconButton>
        <IconButton label="Delete" variant="tertiary">
          <IconTrash />
        </IconButton>
        <IconButton label="Delete" variant="critical">
          <IconTrash />
        </IconButton>
        <IconButton label="Delete" variant="criticalTertiary">
          <IconTrash />
        </IconButton>
      </Stack>

      <Text variant="emphasis">Sizes</Text>
      <Stack horizontal>
        <IconButton label="Delete" size="normal">
          <IconTrash />
        </IconButton>
        <IconButton label="Delete" size="large">
          <IconTrash />
        </IconButton>
      </Stack>
    </Stack>
  )
}
