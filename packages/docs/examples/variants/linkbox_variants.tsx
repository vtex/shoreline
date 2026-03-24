import { LinkBox, Text } from '@vtex/shoreline'

export function DefaultLinkBox() {
  return (
    <LinkBox href="https://vtex.com">
      <Text variant="body">Click anywhere to navigate</Text>
    </LinkBox>
  )
}

export function LinkBoxWithNestedLink() {
  return (
    <LinkBox href="https://vtex.com">
      <Text variant="body">Container links to VTEX</Text>
      <a href="https://google.com">This links to Google instead</a>
    </LinkBox>
  )
}

export function LinkBoxBlankTarget() {
  return (
    <LinkBox href="https://vtex.com" target="_blank">
      <Text variant="body">Opens in a new tab</Text>
    </LinkBox>
  )
}
