import './styles.css'

import { EmptyState, EmptyStateActions, EmptyStateIllustration } from '../index'
import { Button } from '../../button'
import { Heading } from '../../heading'
import { Text } from '../../text'
import { IconMagnifyingGlass, IconWarningCircle } from '@vtex/shoreline-icons'
import { Filter, FilterProvider, FilterTrigger } from '../../filter'
import { Popover } from '../../popover'

export default {
  title: 'components/empty-state',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function FilterError() {
  return (
    <FilterProvider>
      <FilterTrigger>Status</FilterTrigger>
      <Popover data-sl-filter-popover>
        <EmptyState size="small" style={{ height: '18.25rem' }}>
          <EmptyStateIllustration>
            <IconWarningCircle color="var(--sl-color-red-8)" />
          </EmptyStateIllustration>
          <Heading>Something went wrong</Heading>
          <EmptyStateActions>
            <Button>Try again</Button>
          </EmptyStateActions>
        </EmptyState>
      </Popover>
    </FilterProvider>
  )
}

export function FilterNotFound() {
  return (
    <Filter label="Country" defaultValue={[]} setSearchValue={(value) => {}}>
      <EmptyState size="small" style={{ height: '15rem' }}>
        <EmptyStateIllustration>
          <IconMagnifyingGlass color="var(--sl-color-gray-8)" />
        </EmptyStateIllustration>
        <Heading>No results found</Heading>
        <Text variant="body">Try using different terms.</Text>
      </EmptyState>
    </Filter>
  )
}
