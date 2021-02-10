import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { FilterBar, StatementsProps } from './index'
import { Box } from '../Box'

export default {
  title: 'components/FilterBar',
  component: FilterBar,
} as Meta

export const WithStatements: Story = () => {
  const conditions = [
    { label: 'is', id: '1' },
    { label: 'contains', id: '2' },
  ]

  const [state, setState] = useState<StatementsProps<FilterTypes>>({
    statements: [],
  })

  return (
    <Box>
      <FilterBar
        label="Use a filter to find products, create collections or generate a report"
        statements={state.statements}
        filters={[
          {
            label: 'Status',
            conditions: [
              ...conditions,
              { label: 'is not', id: '3' },
              { label: 'is empty', id: '4' },
              { label: 'is equal to', id: '5' },
            ],
            resolver: {
              type: 'simple',
              items: [
                { label: 'Active' },
                { label: 'Inactive' },
                { label: 'Archived' },
              ],
              accessor: 'label',
            },
          },
          {
            label: 'Topic',
            conditions,
            resolver: {
              type: 'simple',
              accessor: 'label',
              items: [
                { label: '1', id: '3' },
                { label: '2', id: '5' },
                { label: '3', id: '4' },
              ],
            },
          },
          {
            label: 'Store',
            conditions,
            resolver: {
              type: 'simple',
              items: [
                { label: '1', id: '3' },
                { label: '2', id: '5' },
                { label: '3', id: '4' },
              ],
              accessor: 'label',
            },
          },
          {
            label: 'Root',
            conditions,
            resolver: {
              type: 'root',
              render: (props) => {
                console.log(props)
                return <div>test</div>
              },
            },
          },
        ]}
        handleStatementChange={(statements) => {
          console.log(statements)
          setState(statements)
        }}
      />
    </Box>
  )
}

type FilterTypes = Items | ItemsTest

interface Items {
  label: string
}

interface ItemsTest {
  label: string
  id: string
}
