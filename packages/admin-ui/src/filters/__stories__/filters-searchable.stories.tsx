import React from 'react'
import type { Meta } from '@storybook/react'

import { FilterDisclosure } from '../filter-disclosure'
import { FilterPopover } from '../filter-popover'

import { FilterFooter } from '../filter-footer'
import { FilterListbox } from '../filter-listbox'
import { useFilterMultipleState } from '../filter-multiple/filter-multiple.state'
import { useFilterState } from '../filter/filter.state'

import { FilterOptionRadio } from '../filter/filter-option-radio'

import { FilterSearchbox } from '../filter-searchbox'
import { FilterOptionCheckbox } from '../filter-multiple/filter-option-checkbox'

export default {
  title: 'admin-ui/FiltersSearch',
  component: FilterSearchbox,
} as Meta

export function SingleSearch() {
  const items = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
    { label: 'Half empty', id: '#4' },
    { label: 'Unknown', id: '#5' },
  ]

  const filterState = useFilterState({ fullList: items })

  return (
    <>
      <FilterDisclosure state={filterState}>Example</FilterDisclosure>
      <FilterPopover state={filterState}>
        <FilterSearchbox id="boxy" state={filterState.combobox} />
        <FilterListbox state={filterState}>
          {filterState.combobox.matches.map((item) => (
            <FilterOptionRadio id={item.id} state={filterState}>
              {item.label}
            </FilterOptionRadio>
          ))}
        </FilterListbox>
        <FilterFooter state={filterState} />
      </FilterPopover>
    </>
  )
}

export function MultiSearch() {
  const items = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
    { label: 'Half empty', id: '#4' },
    { label: 'Unknown', id: '#5' },
  ]

  const filterState = useFilterMultipleState({ fullList: items })

  return (
    <>
      <FilterDisclosure state={filterState}>Example</FilterDisclosure>
      <FilterPopover state={filterState}>
        <FilterSearchbox id="boxy" state={filterState.combobox} />
        <FilterListbox state={filterState}>
          {filterState.combobox.matches.map((item) => (
            <FilterOptionCheckbox id={item.id} state={filterState}>
              {item.label}
            </FilterOptionCheckbox>
          ))}
        </FilterListbox>
        <FilterFooter state={filterState} />
      </FilterPopover>
    </>
  )
}
