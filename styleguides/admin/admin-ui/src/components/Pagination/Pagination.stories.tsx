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
      numberOfItemsFrom={1}
      numberOfItemsTo={50}
      textOf="of"
      total={74}
      textResults="results"
      tooltipLabelPrev="Back"
      tooltipLabelNext="Next"
    />
  )
}
