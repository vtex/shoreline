import { EmptyState, Heading, Text } from '@vtex/shoreline'

export function SmallEmptyState() {
  return (
    <EmptyState size="small">
      <Heading>Small Empty State</Heading>
      <Text variant="body">This is a small empty state</Text>
    </EmptyState>
  )
}

export function MediumEmptyState() {
  return (
    <EmptyState size="medium">
      <Heading>Medium Empty State</Heading>
      <Text variant="body">This is a medium empty state</Text>
    </EmptyState>
  )
}

export function LargeEmptyState() {
  return (
    <EmptyState size="large">
      <Heading>Large Empty State</Heading>
      <Text variant="body">This is a large empty state</Text>
    </EmptyState>
  )
}
