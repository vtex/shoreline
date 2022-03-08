import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { SingleSelectFilter } from '../index'

import type { UseSingleFilterStateProps } from '../useSingleFilterState'
import { useSingleFilterState } from '../useSingleFilterState'
import type { FilterItem } from '../useFilterState'
import { Flex } from '../../Flex'

export default {
  title: 'admin-ui/Filters/SingleSelect',
  component: SingleSelectFilter,
} as Meta

export const Playground: Story<UseSingleFilterStateProps<FilterItem>> = (
  args
) => {
  const state = useSingleFilterState(args)

  return <SingleSelectFilter state={state} />
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

export function Single() {
  const state = useSingleFilterState({
    items: [
      { label: 'Rio de Janeiro', value: 1, id: '#1' },
      { label: 'New York', value: 2, id: '#2' },
      { label: 'Paris', value: 3, id: '#3' },
      { label: 'Tokyo', value: 4, id: '#4' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'City',
  })

  const state2 = useSingleFilterState({
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
    label: 'Name',
    initialApplied: '#1',
  })

  return (
    <Flex>
      <SingleSelectFilter state={state} />
      <SingleSelectFilter state={state2} />
    </Flex>
  )
}
