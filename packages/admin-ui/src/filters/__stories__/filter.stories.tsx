import React, { useEffect } from 'react'
import type { Meta, Story } from '@storybook/react'

import { useMenuState } from 'ariakit'

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

  // filter state would come from:
  // const filterState = useFilterMultipleState({
  //   items: list,
  //   getOptionLabel,
  // })

  const menu = useMenuState(filterState.combobox)

  return (
    <>
      <FilterDisclosure
        appliedItems={filterState.appliedItems}
        state={menu}
        getOptionLabel={(op) => op.label}
      >
        {label}
      </FilterDisclosure>

      <FilterPopover state={menu}>
        <FilterListbox state={filterState.combobox}>
          {list.map((item) => (
            <FilterOptionCheckbox
              item={item}
              key={item.id}
              state={filterState}
            />
          ))}
        </FilterListbox>
        <FilterFooter {...filterState} />
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

  // filter state would come from:
  // const filterState = useFilterState({
  //   items: list,
  //   getOptionLabel: (op) => op.id,
  // })

  const menu = useMenuState(filterState.combobox)

  return (
    <>
      <FilterDisclosure
        appliedItems={filterState.appliedItem ? [filterState.appliedItem] : []}
        state={menu}
        getOptionLabel={(op) => op.label}
      >
        {label}
      </FilterDisclosure>

      <FilterPopover state={menu}>
        <FilterListbox state={filterState.combobox}>
          {list.map((item) => (
            <FilterOptionRadio item={item} key={item.id} state={filterState} />
          ))}
        </FilterListbox>
        <FilterFooter {...filterState} />
      </FilterPopover>
    </>
  )
}

function PlaygroundExample({ args }: any) {
  const filterState = useFilterMultipleState({ items: args.items })

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
    items,
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
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

  const filterState = useFilterState({
    items,
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
  })

  return <Filter label="Single" list={items} filterState={filterState} />
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
      { label: 'Half empty', value: 4, id: '#10' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
  })

  const state2 = useFilterState({
    items: [
      { label: 'Rio de Janeiro', value: 1, id: '#1' },
      { label: 'New York', value: 2, id: '#2' },
      { label: 'Paris', value: 3, id: '#3' },
      { label: 'Tokyo', value: 4, id: '#4' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
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
  })

  useEffect(() => {
    state2.setAppliedItem({ label: 'Rio de Janeiro', value: 1, id: '#1' })
    state.setAppliedItems([
      { label: 'Full', value: 1, id: '#1' },
      { label: 'Empty', value: 2, id: '#2' },
    ])
    state3.setAppliedItems([
      { label: 'Half empty', value: 4, id: '#4' },
      { label: 'Empty', value: 2, id: '#2' },
    ])
  }, [])

  const filterGroupState = useFilterGroupState({
    filterStates: [state, state2, state3],
  })

  return (
    <FilterGroup state={filterGroupState}>
      <FilterMultiple filterState={state} label="Status" list={state.items} />
      <Filter filterState={state2} label="City" list={state2.items} />
      <FilterMultiple
        filterState={state3}
        label="Preselected"
        list={state3.items}
      />
    </FilterGroup>
  )
}

export function Interationalization() {
  const state = useFilterState({
    items: [
      { label: 'Rio de Janeiro', value: 1, id: '#1' },
      { label: 'New York', value: 2, id: '#2' },
      { label: 'Paris', value: 3, id: '#3' },
      { label: 'Tokyo', value: 4, id: '#4' },
    ],
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
  })

  const filterGroupState = useFilterGroupState({
    filterStates: [state],
  })

  return (
    <I18nProvider locale="pt-BR">
      <FilterGroup state={filterGroupState}>
        <Filter filterState={state} label="Cidade" list={state.items} />
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

  const filterState = useFilterMultipleState({
    items,
  })

  const menu = useMenuState(filterState.combobox)

  return (
    <>
      <FilterDisclosure
        appliedItems={filterState.appliedItems}
        state={menu}
        getOptionLabel={(op) => op.label}
      >
        Example
      </FilterDisclosure>

      <FilterPopover state={menu}>
        <FilterListbox state={filterState.combobox}>
          {items.map((item) => (
            <FilterOptionCheckbox
              item={item}
              key={item.id}
              state={filterState}
            />
          ))}
        </FilterListbox>
        <FilterFooter {...filterState} />
      </FilterPopover>
    </>
  )
}

export function SingleFromScrach() {
  const items = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
  ]

  const filterState = useFilterState({
    items,
  })

  const menu = useMenuState(filterState.combobox)

  return (
    <>
      <FilterDisclosure
        appliedItems={filterState.appliedItem ? [filterState.appliedItem] : []}
        state={menu}
        getOptionLabel={(op) => op.label}
      >
        Example
      </FilterDisclosure>

      <FilterPopover state={menu}>
        <FilterListbox state={filterState.combobox}>
          {items.map((item) => (
            <FilterOptionRadio item={item} key={item.id} state={filterState} />
          ))}
        </FilterListbox>
        <FilterFooter {...filterState} />
      </FilterPopover>
    </>
  )
}
