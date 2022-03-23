import React from 'react'
import type { Meta, Story } from '@storybook/react'

import {
  FilterGroup,
  FilterMultiple,
  Filter,
  useFilterMultipleState,
  useFilterState,
} from '../index'
import type { UseFilterMultipleStateProps } from '../base-filter.state'
import { useFilterGroupState } from '../filter-group.state'
import { I18nProvider } from '@react-aria/i18n'

export default {
  title: 'admin-ui/Filters',
  component: FilterGroup,
} as Meta

export const Playground: Story = (args) => {
  const { type, ...restArgs } = args

  const onChange = () => {}

  const hookArgs = { ...restArgs, onChange }

  const multipleState = useFilterMultipleState(
    hookArgs as unknown as UseFilterMultipleStateProps
  )

  return <FilterMultiple state={multipleState} />
}

Playground.args = {
  items: [
    { label: 'Full', value: 1, id: '#1' },
    { label: 'Empty', value: 2, id: '#2' },
    { label: 'Half full', value: 3, id: '#3' },
    { label: 'Half empty', value: 4, id: '#4' },
    { label: 'Unknown', value: 5, id: '#5' },
  ],
  label: 'Status',
}

export function Multiple() {
  const state = useFilterMultipleState({
    items: [
      { label: 'Full', id: '#1' },
      { label: 'Empty', id: '#2' },
      { label: 'Half full', id: '#3' },
      { label: 'Half empty', id: '#4' },
      { label: 'Unknown', id: '#5' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Status',
    initialApplied: ['#1', '#2'],
  })

  return <FilterMultiple state={state} />
}

export function Single() {
  const state = useFilterState({
    items: [
      { label: 'Rio de Janeiro', value: 1, id: '#1' },
      { label: 'New York', value: 2, id: '#2' },
      { label: 'Paris', value: 3, id: '#3' },
      { label: 'Tokyo', value: 4, id: '#4' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'City',
  })

  return <Filter state={state} />
}

export function BasicFilterGroup() {
  const state = useFilterMultipleState({
    items: [
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
      { label: 'Half full', value: 3, id: '#3' },
      { label: 'Half empty', value: 4, id: '#4' },
      { label: 'Unknown', value: 5, id: '#5' },
      { label: 'Unknown', value: 5, id: '#6' },
      { label: 'Unknown', value: 5, id: '#7' },
      { label: 'Unknown', value: 5, id: '#8' },
      {
        label: 'Half empty andSomeLongTextomgwhothoughthiswasgood',
        value: 4,
        id: '#9',
      },
      { label: 'Half empty', value: 4, id: '#10' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Status',
    initialApplied: ['#1', '#2'],
  })

  const state2 = useFilterState({
    items: [
      { label: 'Rio de Janeiro', value: 1, id: '#1' },
      { label: 'New York', value: 2, id: '#2' },
      { label: 'Paris', value: 3, id: '#3' },
      { label: 'Tokyo', value: 4, id: '#4' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'City',
    initialApplied: '#1',
  })

  const state3 = useFilterMultipleState({
    items: [
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
      { label: 'Half full', value: 3, id: '#3' },
      { label: 'Half empty', value: 4, id: '#4' },
      { label: 'Unknown', value: 5, id: '#5' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Preselected',
    initialApplied: ['#4', '#2'],
  })

  const filterGroupState = useFilterGroupState({
    filterStates: [state, state2, state3],
  })

  return (
    <FilterGroup state={filterGroupState}>
      <FilterMultiple state={state} />
      <Filter state={state2} />
      <FilterMultiple state={state3} />
    </FilterGroup>
  )
}

export const Interationalization = () => {
  return (
    <I18nProvider locale="pt-BR">
      <BasicFilterGroup />
    </I18nProvider>
  )
}
