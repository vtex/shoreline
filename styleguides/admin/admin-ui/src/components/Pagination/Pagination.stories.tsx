import React from 'react'
import { Meta } from '@storybook/react'

import { Pagination } from './'
import { usePagination } from './usePagination'

export default {
  title: 'admin-ui/Pagination',
  component: Pagination,
} as Meta

export function Basic() {
  const pagination = usePagination({ size: 5 })

  return (
    <Pagination
      pagination={pagination}
      total={74}
      preposition="of"
      subject="results"
      prevLabel="Back"
      nextLabel="Next"
    />
  )
}
