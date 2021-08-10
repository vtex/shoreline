import React from 'react'
import type { Meta } from '@storybook/react'

import { Pagination } from '../Pagination'
import { usePaginationState } from '../usePaginationState'

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
