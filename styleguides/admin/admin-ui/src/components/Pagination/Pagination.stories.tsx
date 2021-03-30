import React from 'react'
import { Meta } from '@storybook/react'

import { Pagination } from './'
import { usePagination } from './usePagination'

export default {
  title: 'admin-ui/Pagination',
  component: Pagination,
} as Meta

export function Basic() {
  const {
    paginate,
    paginationState: { range },
  } = usePagination({ size: 5 })

  return (
    <Pagination
      range={range}
      total={74}
      preposition="of"
      subject="results"
      prevLabel="Back"
      nextLabel="Next"
      onClickPrev={() => paginate('prev')}
      onClickNext={() => paginate('next')}
    />
  )
}
