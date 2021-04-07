import React from 'react'
import { Meta } from '@storybook/react'

import { Pagination } from './'
import { usePaginationState } from './usePaginationState'

export default {
  title: 'admin-ui/Pagination',
  component: Pagination,
} as Meta

export function Basic() {
  const state = usePaginationState({ size: 5 })

  return (
    <Pagination
      state={state}
      total={74}
      preposition="of"
      subject="results"
      prevLabel="Back"
      nextLabel="Next"
    />
  )
}
