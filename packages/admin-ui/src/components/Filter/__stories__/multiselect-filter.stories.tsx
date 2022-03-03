import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { MultiselectFilter, SingleSelectFilter } from '../index'

import { useMultipleFilterState } from '../useMultipleFilterState'

import { useSingleFilterState } from '../useSingleFilterState'
import type { FilterItem, UseMultipleFilterStateProps } from '../useFilterState'
import { Flex } from '../../Flex'

export default {
  title: 'admin-ui/Filters/MultiselectFilter',
  component: MultiselectFilter,
} as Meta

export const Playground: Story<UseMultipleFilterStateProps<FilterItem>> = (
  args
) => {
  const state = useMultipleFilterState(args)

  return <MultiselectFilter state={state} />
}

Playground.args = {
  items: [
    { label: 'Full', value: 1, id: '#1' },
    { label: 'Empty', value: 2, id: '#2' },
    { label: 'Half full', value: 3, id: '#3' },
    { label: 'Half empty', value: 4, id: '#4' },
    { label: 'Unknown', value: 5, id: '#5' },
  ],
  onChange: ({ selected }) => console.log(`Just applied: ${selected}`),
  label: 'Status',
}

export function Multiple() {
  const state = useMultipleFilterState({
    items: [
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
      { label: 'Half full', value: 3, id: '#3' },
      { label: 'Half empty', value: 4, id: '#4' },
      { label: 'Unknown', value: 5, id: '#5' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Status',
    initialSelected: ['#1', '#2'],
  })

  return <MultiselectFilter state={state} />
}

export function Mixed() {
  const state = useMultipleFilterState({
    items: [
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
      { label: 'Half full', value: 3, id: '#3' },
      { label: 'Half empty', value: 4, id: '#4' },
      { label: 'Unknown', value: 5, id: '#5' },
      { label: 'Unknown', value: 5, id: '#6' },
      { label: 'Unknown', value: 5, id: '#7' },
      { label: 'Unknown', value: 5, id: '#8' },
      { label: 'Half empty', value: 4, id: '#9' },
      { label: 'Half empty', value: 4, id: '#10' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Status',
  })

  const state2 = useSingleFilterState({
    items: [
      { label: 'Rio de Janeiro', value: 1, id: '#1' },
      { label: 'New York', value: 2, id: '#2' },
      { label: 'Paris', value: 3, id: '#3' },
      { label: 'Tokyo', value: 4, id: '#4' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'City',
  })

  const state3 = useMultipleFilterState({
    items: [
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
      { label: 'Half full', value: 3, id: '#3' },
      { label: 'Half empty', value: 4, id: '#4' },
      { label: 'Unknown', value: 5, id: '#5' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Preselected',
    initialSelected: ['#1', '#2'],
  })

  return (
    <Flex>
      <MultiselectFilter state={state} />
      <SingleSelectFilter state={state2} />
      <MultiselectFilter state={state3} />
    </Flex>
  )
}
