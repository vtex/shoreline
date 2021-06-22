import React from 'react'
import { Meta, Story } from '@storybook/react'

import { FilterBar } from '../index'
import { useFilterBarState } from '../useFilterBarState'

export default {
  title: 'admin-ui/FilterBar/State',
  component: FilterBar,
} as Meta

export const State: Story = () => {
  const filterBarState = useFilterBarState({
    statements: [
      {
        condition: { label: 'is bigger than', id: '1' },
        filter: {
          id: 'price',
          label: 'Price',
          conditions: [
            { label: 'is bigger than', id: '3' },
            { label: 'is smaller than', id: '4' },
          ],
          resolver: {
            type: 'simple',
            defaultValue: { value: 100 },
            items: [{ value: 1 }, { value: 10 }, { value: 50 }],
          },
        },
        target: { value: 10 },
      },
    ],
    conjunction: { label: 'Or', value: 'or' },
    filters: [
      {
        id: 'price',
        label: 'Price',
        conditions: [
          { label: 'is bigger than', id: '3' },
          { label: 'is smaller than', id: '4' },
        ],
        resolver: {
          type: 'simple',
          defaultValue: { value: 100 },
          items: [{ value: 1 }, { value: 10 }, { value: 50 }],
        },
      },
      {
        id: 'productName',
        label: 'Product Name',
        conditions: [
          { label: 'is equal', id: '1' },
          { label: 'is not equal', id: '2' },
          { label: 'contains', id: '2' },
        ],
        resolver: {
          type: 'simple',
          defaultValue: { value: 100 },
          items: [
            { value: 1 },
            { value: 10 },
            { value: 50 },
            { value: 100 },
            { value: 250 },
            { value: 500 },
          ],
        },
      },
    ],
  })

  return (
    <FilterBar
      state={filterBarState}
      label="Use a filter to find products, create collections or generate a report"
      onApply={(filters) => {
        console.log(filters)
      }}
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
  )
}
