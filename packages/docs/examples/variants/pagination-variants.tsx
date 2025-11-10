import { Pagination, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">First Page</Text>
      <Pagination page={1} total={100} />

      <Text variant="emphasis">Middle Page</Text>
      <Pagination page={50} total={100} />

      <Text variant="emphasis">Last Page</Text>
      <Pagination page={100} total={100} />

      <Text variant="emphasis">Few Pages</Text>
      <Pagination page={3} total={5} />

      <Text variant="emphasis">Single Page</Text>
      <Pagination page={1} total={1} />
    </Stack>
  )
}
