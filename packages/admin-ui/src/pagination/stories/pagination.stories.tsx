import React from 'react'
import type { Meta } from '@storybook/react'

import {
  Pagination,
  usePaginationState,
  useQueryPaginationState,
} from '../index'
import { Stack } from '../../stack'
import { TextInput } from '../../text-input'
import { QueryStateProvider } from '@vtex/admin-ui-hooks'

export default {
  title: 'admin-ui-review/pagination',
  component: Pagination,
} as Meta

export function Basic() {
  const state = usePaginationState({ pageSize: 5, total: 74 })

  return <Pagination state={state} />
}

export function InitialState() {
  const state = usePaginationState({
    pageSize: 5,
    initialPage: 2,
    total: 74,
  })

  return <Pagination state={state} />
}

export function Loading() {
  const state = usePaginationState({
    pageSize: 5,
    initialPage: 2,
    total: 74,
  })

  return <Pagination loading state={state} />
}

export function SinglePage() {
  const state = usePaginationState({
    pageSize: 25,
    total: 25,
  })

  return <Pagination state={state} />
}

export function PersistedPaginationWithQuery() {
  const Content = () => {
    const state = useQueryPaginationState({
      pageSize: 20,
      total: 150,
    })

    return (
      <Stack>
        <TextInput
          label="Current URL:"
          id="current-url-input"
          value={window.location.href}
          disabled
          helpText="You can copy the part with page in your URL to see the page
            load directly on choosed page"
        />
        <Pagination state={state} />
      </Stack>
    )
  }

  return (
    <QueryStateProvider>
      <Content />
    </QueryStateProvider>
  )
}
