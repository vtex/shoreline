import React from 'react'
import type { Meta } from '@storybook/react'

import { Pagination } from '../Pagination'
import { usePaginationState } from '../hooks/usePaginationState'
import { useQueryPaginationState } from '../hooks/useQueryPaginationState'
import { Set } from '../../Set'
import { Input } from '../../Input'
import { QueryStateProvider } from '@vtex/admin-ui-hooks'

export default {
  title: 'admin-ui/Pagination',
  component: Pagination,
} as Meta

export function Basic() {
  const state = usePaginationState({ pageSize: 5, total: 74 })

  return (
    <Pagination
      state={state}
      preposition="of"
      subject="results"
      prevLabel="Previous"
      nextLabel="Next"
    />
  )
}

export function InitialState() {
  const state = usePaginationState({
    pageSize: 5,
    initialPage: 2,
    total: 74,
  })

  return (
    <Pagination
      state={state}
      preposition="of"
      subject="results"
      prevLabel="Previous"
      nextLabel="Next"
    />
  )
}

export function PersistedPaginationWithQuery() {
  const state = useQueryPaginationState({
    pageSize: 20,
    total: 150,
  })

  return (
    <QueryStateProvider>
      <Set orientation="vertical" spacing={6}>
        <Input
          label="Current URL:"
          id="current-url-input"
          value={window.location.href}
          disabled
          csx={{ width: 'lg' }}
          helperText="You can copy the part with page in your URL to see the page
        load directly on choosed page"
        />
        <Pagination
          state={state}
          preposition="of"
          subject="results"
          prevLabel="Previous"
          nextLabel="Next"
        />
      </Set>
    </QueryStateProvider>
  )
}
