import { Skeleton, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Rect Shape</Text>
      <Skeleton shape="rect" style={{ width: 200, height: 100 }} />

      <Text variant="emphasis">Circle Shape</Text>
      <Skeleton shape="circle" style={{ width: 100, height: 100 }} />
    </Stack>
  )
}
