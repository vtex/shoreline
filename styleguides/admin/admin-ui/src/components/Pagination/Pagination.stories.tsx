import React from 'react'
import { Meta } from '@storybook/react'

import { Pagination } from './'

export default {
  title: 'admin-ui/Pagination',
  component: Pagination,
} as Meta

export function Basic() {
  return (
    <Pagination
      range={[1, 50]}
      total={74}
      preposition="of"
      subject="results"
      prevLabel="Back"
      nextLabel="Next"
    />
  )
}
