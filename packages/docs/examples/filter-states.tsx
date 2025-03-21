import {
  EmptyState,
  EmptyStateIllustration,
  Filter,
  Text,
  Stack,
  IconXCircle,
  IconWarningCircle,
  Button,
  EmptyStateActions,
  Heading,
  FilterListSkeleton,
  FilterItem,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack horizontal>
      <Filter label="Empty state">
        <EmptyState size="small" style={{ height: '15rem' }}>
          <EmptyStateIllustration>
            <IconXCircle color="var(--sl-color-gray-8)" />
          </EmptyStateIllustration>

          <Text variant="emphasis">No filters available</Text>
        </EmptyState>
      </Filter>

      <Filter label="Error state">
        <EmptyState size="small" style={{ height: '15rem' }}>
          <EmptyStateIllustration>
            <IconWarningCircle color="var(--sl-color-red-8)" />
          </EmptyStateIllustration>
          <Heading>Something went wrong</Heading>
          <EmptyStateActions>
            <Button>Try again</Button>
          </EmptyStateActions>
        </EmptyState>
      </Filter>

      <Filter label="Loading">
        <FilterListSkeleton />
      </Filter>

      <Filter label="Disabled" disabled>
        <FilterItem value="Stable">Stable</FilterItem>
        <FilterItem value="Experimental">Experimental</FilterItem>
        <FilterItem value="Deprecated">Deprecated</FilterItem>
      </Filter>
    </Stack>
  )
}
