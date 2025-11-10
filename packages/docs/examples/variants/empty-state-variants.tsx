import {
  Button,
  EmptyState,
  Heading,
  EmptyStateActions,
  Stack,
  Text,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Small</Text>
      <EmptyState size="small">
        <Heading>Small Empty State</Heading>
        <EmptyStateActions>
          <Button variant="primary">Action</Button>
        </EmptyStateActions>
      </EmptyState>

      <Text variant="emphasis">Medium</Text>
      <EmptyState size="medium">
        <Heading>Medium Empty State</Heading>
        <EmptyStateActions>
          <Button variant="primary">Action</Button>
        </EmptyStateActions>
      </EmptyState>

      <Text variant="emphasis">Large</Text>
      <EmptyState size="large">
        <Heading>Large Empty State</Heading>
        <EmptyStateActions>
          <Button variant="primary">Action</Button>
        </EmptyStateActions>
      </EmptyState>
    </Stack>
  )
}
