import React from 'react'
import type { Meta } from '@storybook/react'

import { useFilterMultipleState, useFilterState } from '../index'

import { FilterSearch } from '../filter-search'
import { FilterMultipleSearch } from '../filter-multiple-search'

export default {
  title: 'admin-ui/FiltersSearch',
  component: FilterSearch,
} as Meta

export function Search() {
  const state = useFilterMultipleState({
    items: [
      { label: 'Rio de Janeiro', id: '#1' },
      { label: 'New York', id: '#2' },
      { label: 'Paris', id: '#3' },
      { label: 'Tokyo', id: '#4' },
      { label: 'São Paulo', id: '#5' },
      { label: 'Berlin', id: '#7' },
      { label: 'Washington', id: '#8' },
      { label: 'Lisboa', id: '#9' },
      { label: 'Porto', id: '#10' },
      { label: 'João Pessoa', id: '#11' },
      { label: 'Salvador', id: '#12' },
      { label: 'Barcelona', id: '#13' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'City',
  })

  return <FilterMultipleSearch state={state} />
}

export function SingleSearch() {
  const state = useFilterState({
    items: [
      { label: 'Rio de Janeiro', id: '#1' },
      { label: 'New York', id: '#2' },
      { label: 'Paris', id: '#3' },
      { label: 'Tokyo', id: '#4' },
      { label: 'São Paulo', id: '#5' },
      { label: 'Berlin', id: '#7' },
      { label: 'Washington', id: '#8' },
      { label: 'Lisboa', id: '#9' },
      { label: 'Porto', id: '#10' },
      { label: 'João Pessoa', id: '#11' },
      { label: 'Salvador', id: '#12' },
      { label: 'Barcelona', id: '#13' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'City',
  })

  return <FilterSearch state={state} />
}
