import React from 'react'
import type { Meta } from '@storybook/react'

import { Pagination } from '../Pagination'
import { usePaginationState } from '../hooks/usePaginationState'
import { useQueryPaginationState } from '../hooks/useQueryPaginationState'
import { Stack } from '../../../stack'
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
  const Content = () => {
    const state = useQueryPaginationState({
      pageSize: 20,
      total: 150,
    })

    return (
      <Stack>
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
      </Stack>
    )
  }

  return (
    <QueryStateProvider>
      <Content />
    </QueryStateProvider>
  )
}
