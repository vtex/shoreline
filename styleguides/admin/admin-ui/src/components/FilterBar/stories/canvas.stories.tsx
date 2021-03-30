import React from 'react'
import { Meta, Story } from '@storybook/react'

import { FilterBar } from '../index'

export default {
  title: 'components/FilterBar',
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
            defaultValue: { label: '2' },
            items: [{ label: '1' }, { label: '2' }, { label: '3' }],
            accessor: 'label',
          },
        },
        {
          label: 'Specific Store Label',
          id: 'specificStoreLabel',
          conditions,
          resolver: {
            type: 'simple',
            defaultValue: { label: '2', id: '5' },
            items: [
              { label: '1', id: '3' },
              { label: '2', id: '5' },
              { label: '3', id: '4' },
            ],
            accessor: 'label',
          },
        },
        {
          label: 'Topic',
          id: 'topic',
          conditions,
          resolver: {
            type: 'simple',
            accessor: 'label',
            defaultValue: { label: '2', id: '5' },
            items: [
              { label: '1', id: '3' },
              { label: '2', id: '5' },
              { label: '3', id: '4' },
            ],
          },
        },

        {
          label: 'Specific Store Label',
          id: 'specificStoreLabel',
          conditions,
          resolver: {
            type: 'simple',
            defaultValue: { label: '1', id: '3' },
            items: [
              { label: '1', id: '3' },
              { label: '2', id: '5' },
              { label: '3', id: '4' },
            ],
            accessor: 'label',
          },
        },
      ]}
      handleStatementChange={(statements) => {
        console.log(statements)
      }}
    />
  )
}
