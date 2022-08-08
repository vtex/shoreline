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
import { FilterControl } from '../filter-control/filter-control'
import { useFilterControl } from '../filter-control/filter-control-state'
import { FilterOptional } from '../filter-control/filter-optional'

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

function GenericFilter({ list, label }: { list: any[]; label: string }) {
  const state = useFilterMultipleState()

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

export function GroupWithHiddenFilters() {
  const togState = useFilterControl()

  const filterGroupState = useFilterGroupState({
    filterStates: [],
  })

  return (
    <FilterGroup state={filterGroupState}>
      <GenericFilter list={list1} label="Important filter" />
      <GenericFilter list={list2} label="Price" />
      <GenericFilter list={list1} label="Status" />

      <FilterOptional id="#rare" label="Rare" state={togState}>
        <GenericFilter list={list1} label="Rarely used filter" />
      </FilterOptional>

      <FilterOptional id="#othercity" label="Other city" state={togState}>
        <GenericFilter list={list2} label="Other city" />
      </FilterOptional>

      <FilterOptional id="#cool" label="Cool filter" state={togState}>
        <GenericFilter list={list2} label="Cool" />
      </FilterOptional>

      <FilterControl state={togState} />
    </FilterGroup>
  )
}

export function visibilityToggleStates() {
  const togState = useFilterControl()

  const errorState = useFilterControl()

  const filterGroupState = useFilterGroupState({
    filterStates: [],
  })

  useEffect(() => {
    togState.filterState.setStatus('loading')
    errorState.filterState.setStatus('error')
  }, [])

  return (
    <FilterGroup state={filterGroupState}>
      <GenericFilter list={list1} label="Important filter" />

      <FilterOptional id="#cool" label="Cool Filter" state={togState}>
        <GenericFilter list={list2} label="Cool" />
      </FilterOptional>

      <FilterControl state={togState} />
      <FilterControl state={errorState} />
    </FilterGroup>
  )
}
