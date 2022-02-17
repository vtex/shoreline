import React from 'react'
import type { Meta } from '@storybook/react'

import { Filter } from '../index'
// import { FilterCheckbox } from '../components/FilterCheckbox'
// import { useFilterCheckbox } from '../components/FilterCheckbox/useFilterCheckbox'
import { Set } from '../../Set'
import { useFilterCheckbox } from '../components/FilterCheckbox/useFilterCheckbox'
import { ChecklistFilterContent } from '../components/FilterCheckbox/ChecklistFilterContent'
// import { useFilterRadio } from '../components/FilterRadio/useFilterRadio'
// import { FilterRadio } from '../components/FilterRadio'

export default {
  title: 'admin-ui/Filters',
  component: Filter,
} as Meta

export function Example() {
  const state = useFilterCheckbox({
    items: [
      { label: 'Item 1', value: 1, id: '#1' },
      { label: 'Item 2', value: 2, id: '#2' },
      { label: 'Item 3', value: 3, id: '#3' },
      { label: 'Item 4', value: 4, id: '#4' },
      { label: 'Item 5', value: 5, id: '#5' },
    ],
    onApply: ({ selected }) => console.log(`applied:${selected}`),
    label: 'Status',
  })

  return (
    <Set>
      <Filter label="filtro" state={state}>
        <ChecklistFilterContent state={state} />
      </Filter>
    </Set>
  )
}
