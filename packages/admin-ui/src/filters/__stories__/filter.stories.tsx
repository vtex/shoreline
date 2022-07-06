import React, { useEffect } from 'react'
import type { Meta, Story } from '@storybook/react'

import { FilterDisclosure } from '../filter-disclosure'
import { FilterPopover } from '../filter-popover'

import { FilterFooter } from '../filter-footer'
import { FilterListbox } from '../filter-listbox'
import type { UseFilterMultipleReturn } from '../filter-multiple/filter-multiple.state'
import { useFilterMultipleState } from '../filter-multiple/filter-multiple.state'
import { FilterOptionCheckbox } from '../filter-multiple/filter-option-checkbox'
import type { UseFilterStateReturn } from '../filter/filter.state'
import { useFilterState } from '../filter/filter.state'

import { FilterOptionRadio } from '../filter/filter-option-radio'
import { FilterGroup } from '../filter-group'
import { useFilterGroupState } from '../filter-group.state'
import { I18nProvider } from '@react-aria/i18n'

export default {
  title: 'admin-ui/Filters',
  component: FilterGroup,
} as Meta

function FilterMultiple(props: {
  filterState: UseFilterMultipleReturn<any>
  list: any[]
  label: string
}) {
  const { filterState, list, label } = props

  return (
    <>
      <FilterDisclosure state={filterState}>{label}</FilterDisclosure>

      <FilterPopover state={filterState}>
        <FilterListbox state={filterState}>
          {list.map((item) => (
            <FilterOptionCheckbox
              id={item.id}
              key={item.id}
              value={item}
              state={filterState}
            >
              {item.label}
            </FilterOptionCheckbox>
          ))}
        </FilterListbox>
        <FilterFooter state={filterState} />
      </FilterPopover>
    </>
  )
}

function Filter(props: {
  filterState: UseFilterStateReturn<any>
  list: any[]
  label: string
}) {
  const { filterState, list, label } = props

  return (
    <>
      <FilterDisclosure state={filterState}>{label}</FilterDisclosure>

      <FilterPopover state={filterState}>
        <FilterListbox state={filterState}>
          {list.map((item) => (
            <FilterOptionRadio
              id={item.id}
              value={item.value}
              key={item.id}
              state={filterState}
            >
              {item.label}
            </FilterOptionRadio>
          ))}
        </FilterListbox>
        <FilterFooter state={filterState} />
      </FilterPopover>
    </>
  )
}

function PlaygroundExample({ args }: any) {
  const filterState = useFilterMultipleState({ fullList: args.items })

  return (
    <FilterMultiple
      label={args.label}
      list={args.items}
      filterState={filterState}
    />
  )
}

export const Playground: Story = (args) => {
  return <PlaygroundExample args={args} />
}

Playground.args = {
  items: [
    { label: 'Full', value: 1, id: '#1' },
    { label: 'Empty', value: 2, id: '#2' },
    { label: 'Half full', value: 3, id: '#3' },
    { label: 'Half empty', value: 4, id: '#4' },
    { label: 'Unknown', value: 5, id: '#5' },
    { label: 'Overflowing', value: 5, id: '#6' },
    { label: 'Less than empty', value: 5, id: '#7' },
    { label: 'Almost empty', value: 5, id: '#8' },
    { label: 'Almost full', value: 5, id: '#9' },
    { label: 'Almost full', value: 5, id: '#10' },
    { label: 'Almost full', value: 5, id: '#11' },
  ],
  label: 'Status',
}

export function Multiple() {
  const items = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
    { label: 'Half empty', id: '#4' },
    { label: 'Unknown', id: '#5' },
  ]

  const filterState = useFilterMultipleState({
    fullList: items,
  })

  useEffect(() => {
    filterState.setAppliedItems([
      { label: 'Full', id: '#1' },
      { label: 'Empty', id: '#2' },
    ])
  }, [])

  return (
    <FilterMultiple label="Multiplo" list={items} filterState={filterState} />
  )
}

export function Single() {
  const items = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
    { label: 'Half empty', id: '#4' },
    { label: 'Unknown', id: '#5' },
  ]

  const filterState = useFilterState()

  return <Filter label="Single" list={items} filterState={filterState} />
}

export function BasicFilterGroup() {
  const list1 = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
    { label: 'Half empty', id: '#4' },
    { label: 'Unknown', id: '#5' },
    { label: 'Unknown', id: '#6' },
    { label: 'Unknown', id: '#7' },
    { label: 'Unknown', id: '#8' },
    { label: 'Half empty', id: '#10' },
  ]

  const list2 = [
    { label: 'Rio de Janeiro', value: { grade: 10 }, id: '#1' },
    { label: 'New York', value: { grade: 9 }, id: '#2' },
    { label: 'Paris', value: { grade: 9 }, id: '#3' },
    { label: 'Tokyo', value: { grade: 9 }, id: '#4' },
  ]

  const state = useFilterMultipleState()

  const state2 = useFilterState({})

  useEffect(() => {
    state2.setAppliedItem({
      label: 'Rio de Janeiro',
      value: { grade: 10 },
      id: '#1',
    })
    state.setAppliedItems([
      { label: 'Full', id: '#1' },
      { label: 'Empty', id: '#2' },
    ])
  }, [])

  const filterGroupState = useFilterGroupState({
    filterStates: [state, state2],
  })

  return (
    <FilterGroup state={filterGroupState}>
      <FilterMultiple filterState={state} label="Status" list={list1} />
      <Filter filterState={state2} label="City" list={list2} />
    </FilterGroup>
  )
}

export function Interationalization() {
  const state = useFilterState({})

  const filterGroupState = useFilterGroupState({
    filterStates: [state],
  })

  return (
    <I18nProvider locale="pt-BR">
      <FilterGroup state={filterGroupState}>
        <Filter
          filterState={state}
          label="Cidade"
          list={[
            { label: 'Rio de Janeiro', value: 1, id: '#1' },
            { label: 'New York', value: 2, id: '#2' },
            { label: 'Paris', value: 3, id: '#3' },
            { label: 'Tokyo', value: 4, id: '#4' },
          ]}
        />
      </FilterGroup>
    </I18nProvider>
  )
}

export function MultipleFromScratch() {
  const items = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
  ]

  const filterState = useFilterMultipleState()

  return (
    <>
      <FilterDisclosure state={filterState}>Example</FilterDisclosure>

      <FilterPopover state={filterState}>
        <FilterListbox state={filterState}>
          {items.map((item) => (
            <FilterOptionCheckbox id={item.id} state={filterState} value={item}>
              {item.label}
            </FilterOptionCheckbox>
          ))}
        </FilterListbox>
        <FilterFooter state={filterState} />
      </FilterPopover>
    </>
  )
}

export function SingleFromScrach() {
  const filterState = useFilterState({})

  return (
    <>
      <FilterDisclosure state={filterState}>Example</FilterDisclosure>

      <FilterPopover state={filterState}>
        <FilterListbox state={filterState}>
          <FilterOptionRadio id="#1" state={filterState}>
            Full
          </FilterOptionRadio>
          <FilterOptionRadio id="#2" state={filterState}>
            Empty
          </FilterOptionRadio>
          <FilterOptionRadio id="#3" state={filterState}>
            Half full
          </FilterOptionRadio>
        </FilterListbox>
        <FilterFooter state={filterState} />
      </FilterPopover>
    </>
  )
}
