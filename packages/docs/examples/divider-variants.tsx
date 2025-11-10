import { Divider, Stack, Flex, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Horizontal</Text>
      <Stack>
        <div>Content above</div>
        <Divider orientation="horizontal" />
        <div>Content below</div>
      </Stack>

      <Text variant="emphasis">Vertical</Text>
      <Flex align="center" style={{ height: '100px' }}>
        <div>Content left</div>
        <Divider orientation="vertical" />
        <div>Content right</div>
      </Flex>
    </Stack>
  )
}
