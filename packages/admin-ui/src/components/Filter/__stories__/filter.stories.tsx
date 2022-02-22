import React from 'react'
import type { Meta } from '@storybook/react'

import { Filter } from '../index'

import { useMultipleFilterState } from '../useMultipleFilterState'

import { Set } from '../../Set'

export default {
  title: 'admin-ui/Filters',
  component: Filter,
} as Meta

export function Example() {
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

  const state2 = useMultipleFilterState({
    items: [
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
      { label: 'Half full', value: 3, id: '#3' },
      { label: 'Half empty', value: 4, id: '#4' },
      { label: 'Unknown', value: 5, id: '#5' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Name',
  })

  return (
    <Set orientation="horizontal">
      <Filter state={state} />

      <Filter state={state2} />
    </Set>
  )
}
