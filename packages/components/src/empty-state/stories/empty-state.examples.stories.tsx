import './styles.css'
import React from 'react'

import { EmptyState } from '../index'
import { Button } from '../../button'
import { Heading } from '../../heading'
import { Slot } from '../../slot'
import { Text } from '../../text'
import { IconMagnifyingGlass, IconWarningCircle } from '@vtex/shoreline-icons'
import { Filter, FilterProvider, FilterTrigger } from '../../filter'
import { Popover } from '../../popover'

export default {
  title: 'components/empty-state/examples',
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
          <Slot name="illustration">
            <IconWarningCircle color="var(--sl-color-red-8)" />
          </Slot>
          <Heading>Something went wrong</Heading>
          <Slot name="actions">
            <Button>Try again</Button>
          </Slot>
        </EmptyState>
      </Popover>
    </FilterProvider>
  )
}

export function FilterNotFound() {
  return (
    <Filter label="Country" defaultValue={[]} setSearchValue={(value) => {}}>
      <EmptyState size="small" style={{ height: '15rem' }}>
        <Slot name="illustration">
          <IconMagnifyingGlass color="var(--sl-color-gray-8)" />
        </Slot>
        <Heading>No results found</Heading>
        <Text variant="body">Try using different terms.</Text>
      </EmptyState>
    </Filter>
  )
}
