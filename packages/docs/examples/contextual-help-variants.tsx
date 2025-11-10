import { ContextualHelp, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Bottom Start</Text>
      <ContextualHelp placement="bottom-start" label="Help">
        This is helpful information displayed at the bottom start position.
      </ContextualHelp>

      <Text variant="emphasis">Bottom End</Text>
      <ContextualHelp placement="bottom-end" label="Help">
        This is helpful information displayed at the bottom end position.
      </ContextualHelp>

      <Text variant="emphasis">Top Start</Text>
      <ContextualHelp placement="top-start" label="Help">
        This is helpful information displayed at the top start position.
      </ContextualHelp>

      <Text variant="emphasis">Top End</Text>
      <ContextualHelp placement="top-end" label="Help">
        This is helpful information displayed at the top end position.
      </ContextualHelp>
    </Stack>
  )
}
