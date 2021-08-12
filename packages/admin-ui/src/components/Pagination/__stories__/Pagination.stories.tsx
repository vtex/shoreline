import React from 'react'
import type { Meta } from '@storybook/react'

import { Pagination } from '../Pagination'
import { usePaginationState } from '../hooks/usePaginationState'
import { usePersistedPaginationState } from '../hooks/usePersistedPaginationState'
import { Set } from '../../Set'
import { Input } from '../../Input'

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
  const state = usePersistedPaginationState({
    pageSize: 20,
    total: 150,
  })

  return (
    <Set orientation="vertical" spacing={6}>
      <Input
        label="Current URL:"
        id="current-url-input"
        value={window.location.href}
        disabled
        csx={{ width: 'lg' }}
        helperText="You can copy the part with page and pageSize in your URL to see the page
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
  )
}
