import {
  EmptyState,
  EmptyStateIllustration,
  EmptyStateActions,
  Heading,
  Text,
  Button,
  IconXCircle,
  IconWarningCircle,
} from '@vtex/shoreline'

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

export function EmptyStateWithIllustration() {
  return (
    <EmptyState size="small">
      <EmptyStateIllustration>
        <IconXCircle color="var(--sl-color-gray-8)" />
      </EmptyStateIllustration>
      <Text variant="emphasis">No items available</Text>
    </EmptyState>
  )
}

export function EmptyStateWithActions() {
  return (
    <EmptyState>
      <Heading>Title goes here</Heading>
      <EmptyStateActions>
        <Button variant="primary">Primary action</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}

export function EmptyStateComplete() {
  return (
    <EmptyState>
      <EmptyStateIllustration>
        <IconWarningCircle color="var(--sl-color-gray-8)" />
      </EmptyStateIllustration>
      <Heading>No products found</Heading>
      <Text variant="body">
        Get started by creating your first product using the button below.
      </Text>
      <EmptyStateActions>
        <Button variant="primary">Create product</Button>
        <Button variant="tertiary">Learn more</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
