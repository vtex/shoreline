import React from 'react'
import { Meta, Story } from '@storybook/react'

import { FilterBar } from '../index'

export default {
  title: 'components/FilterBar/Basic',
  component: FilterBar,
} as Meta

export const Basic: Story = () => {
  const conditions = [
    { label: 'is', id: '1' },
    { label: 'contains', id: '2' },
  ]

  return (
    <FilterBar
      label="Use a filter to find products, create collections or generate a report"
      filters={[
        {
          label: 'Status',
          id: 'status',
          conditions: [
            ...conditions,
            { label: 'is not', id: '3' },
            { label: 'is empty', id: '4' },
            { label: 'is equal to', id: '5' },
          ],
          resolver: {
            type: 'simple',
            defaultValue: { value: '2' },
            items: [{ value: '1' }],
          },
        },
        {
          label: 'Specific Store Label',
          id: 'specificStoreLabel',
          conditions,
          resolver: {
            type: 'simple',
            accessor: 'label',
            defaultValue: { value: { label: '1' } },
            items: [
              { value: { label: '1' } },
              { value: { label: '2' } },
              { value: { label: '3' } },
              { value: { label: '4' } },
            ],
          },
        },
        {
          label: 'Topic',
          id: 'topic',
          conditions,
          resolver: {
            type: 'simple',
            defaultValue: { value: '2' },
            items: [{ value: '1' }, { value: '2' }, { value: '3' }],
          },
        },

        {
          label: 'Specific Store Label',
          id: 'specificStoreLabel',
          conditions,
          resolver: {
            type: 'simple',
            defaultValue: { value: { label: '1' } },
            items: [
              { value: { label: '1' } },
              { value: { label: '2' } },
              { value: { label: '3' } },
            ],
            accessor: 'value.label',
          },
        },
      ]}
      handleStatementChange={(filters) => {
        console.log(filters)
      }}
    />
  )
}
