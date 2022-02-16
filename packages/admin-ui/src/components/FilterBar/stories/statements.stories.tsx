import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { FilterBar } from '../index'
import { useFilterBarState } from '../useFilterBarState'
import { Button } from '../../../button'

export default {
  title: 'admin-ui/FilterBar/Statements',
  component: FilterBar,
} as Meta

export const Statements: Story = () => {
  const conditions = [
    { label: 'is', id: '1' },
    { label: 'contains', id: '2' },
  ]

  const state = useFilterBarState({
    conjunction: { label: 'And', value: 'and' },
    filters: [
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
          defaultValue: { value: '1' },
          items: [{ value: '1' }, { value: '2' }],
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
    ],
    onApply: (filters) => {
      console.log(filters)
    },
  })

  const changeStatements = () => {
    state.setStatements([
      {
        target: { value: '3' },
        condition: { label: 'contains', id: '2' },
        filter: {
          label: 'Topic',
          id: 'topic',
          conditions,
          resolver: {
            type: 'simple',
            defaultValue: { value: '2' },
            items: [{ value: '1' }, { value: '2' }, { value: '3' }],
          },
        },
      },
    ])
  }

  return (
    <div>
      <Button onClick={changeStatements}>Change Statements</Button>
      <FilterBar
        state={state}
        label="Use a filter to find products, create collections or generate a report"
        conjunctions={[
          { label: 'And', value: 'and' },
          { label: 'Or', value: 'or' },
        ]}
        internalLabels={{
          conjunctionLabel: 'Conjunction',
          filterLabel: 'Filter',
          conditionLabel: 'Condition',
          statementMenuLabel: 'Statement Menu',
          applyFilterLabel: 'Apply',
          addFilterLabel: 'Add Filter',
          clearFilterLabel: 'Clear Filters',
          deleteStatementLabel: 'Delete',
          duplicateStatementLabel: 'Duplicate',
          whereStatementLabel: 'Where',
        }}
      />
    </div>
  )
}
