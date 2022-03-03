import React from 'react'
import type { Meta } from '@storybook/react'

import { MultiselectFilter, SingleSelectFilter } from '../index'

import { useMultipleFilterState } from '../useMultipleFilterState'

import { useSingleFilterState } from '../useSingleFilterState'

export default {
  title: 'admin-ui/Filters',
  component: MultiselectFilter,
} as Meta

export function Single() {
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
    initialSelected: '#1',
  })

  return <SingleSelectFilter state={state2} />
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
