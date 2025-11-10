import { Link, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Standard Link</Text>
      <Link href="https://vtex.com">VTEX Website</Link>

      <Text variant="emphasis">External Link (New Tab)</Text>
      <Link href="https://vtex.com" target="_blank" rel="noopener noreferrer">
        VTEX Website (opens in new tab)
      </Link>

      <Text variant="emphasis">Link in Text Context</Text>
      <Text variant="body">
        Visit our <Link href="https://vtex.com">main website</Link> for more
        information about the platform.
      </Text>

      <Text variant="emphasis">Multiple Links</Text>
      <Text variant="body">
        Check out our{' '}
        <Link href="https://developers.vtex.com">Developer Docs</Link> or{' '}
        <Link href="https://help.vtex.com">Help Center</Link> for support.
      </Text>
    </Stack>
  )
}
