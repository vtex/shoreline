import React, { useEffect } from 'react'
import type { Meta } from '@storybook/react'

import { FilterDisclosure } from '../filter-disclosure'
import { FilterPopover } from '../filter-popover'

import { FilterFooter } from '../filter-footer'
import { FilterListbox } from '../filter-listbox'

import { useFilterMultipleState } from '../filter-multiple/filter-multiple.state'
import { FilterOptionCheckbox } from '../filter-multiple/filter-option-checkbox'

import { FilterGroup } from '../filter-group'
import { useFilterGroupState } from '../filter-group.state'
import { FilterToggleVisible } from '../filter-toggler/filter-toggle-visible'
import { useFilterShowState } from '../filter-toggler/filter-visibility-state'
import { FilterOptional } from '../filter-toggler/filter-optional'

export default {
  title: 'admin-ui/Filters/advanced',
  component: FilterGroup,
} as Meta

const list1 = [
  { label: 'Full', id: '#1' },
  { label: 'Empty', id: '#2' },
  { label: 'Half full', id: '#3' },
  { label: 'Half empty', id: '#4' },
  { label: 'Unknown', id: '#5' },
  { label: 'Half empty', id: '#10' },
]

const list2 = [
  { label: 'Rio de Janeiro', value: { grade: 10 }, id: '#1' },
  { label: 'New York', value: { grade: 9 }, id: '#2' },
  { label: 'Paris', value: { grade: 9 }, id: '#3' },
  { label: 'Tokyo', value: { grade: 9 }, id: '#4' },
]

function GenericFilter({
  list,
  label,
  startOpen,
}: {
  list: any[]
  label: string
  startOpen?: boolean
}) {
  const state = useFilterMultipleState()

  useEffect(() => {
    if (startOpen) {
      state.menu.show()
    }
  }, [])

  return (
    <>
      <FilterDisclosure state={state}>{label}</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterListbox>
          {list.map((item) => (
            <FilterOptionCheckbox {...item} />
          ))}
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}

export function BasicFilterGroup() {
  const togState = useFilterShowState({
    items: [
      {
        id: '#rare',
        label: 'Rare',
      },
      {
        id: '#othercity',
        label: 'Other city',
      },
      {
        id: '#cool',
        label: 'Cool Filter',
      },
    ],
  })

  const filterGroupState = useFilterGroupState({
    filterStates: [],
  })

  return (
    <FilterGroup state={filterGroupState}>
      <GenericFilter list={list1} label="Important filter" />
      <GenericFilter list={list2} label="Price" />
      <GenericFilter list={list1} label="Status" />

      <FilterOptional id="#rare" state={togState}>
        <GenericFilter
          list={list1}
          label="Rarely used filter"
          startOpen={togState.firstNewFilter?.id === '#rare'}
        />
      </FilterOptional>

      <FilterOptional id="#othercity" state={togState}>
        <GenericFilter
          list={list2}
          label="Other city"
          startOpen={togState.firstNewFilter?.id === '#othercity'}
        />
      </FilterOptional>

      <FilterOptional id="#cool" state={togState}>
        <GenericFilter
          list={list2}
          label="Cool"
          startOpen={togState.firstNewFilter?.id === '#cool'}
        />
      </FilterOptional>

      <FilterToggleVisible state={togState} />
    </FilterGroup>
  )
}
