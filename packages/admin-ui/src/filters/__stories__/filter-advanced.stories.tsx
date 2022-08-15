import React, { useEffect, useState } from 'react'
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
import { useFilterState } from '../filter/filter.state'

import faker from 'faker'
import { FilterOptionRadio } from '../filter/filter-option-radio'
import { FilterSearchbox } from '../filter-searchbox'
import { AnyObject, createColumns, Table, useTableState } from '../..'
import { Stack } from '../../stack'

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
    filterStates: [togState],
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
    filterStates: [togState],
  })

  useEffect(() => {
    togState.setStatus('loading')
    errorState.setStatus('error')
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

interface Item {
  id: string
  name: string
  color: { label: string; id: string }
  status: { label: string; id: string }
  city: { label: string; id: string }
  origin: { label: string; id: string }
}

const database: Item[] = [...Array(100).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    status: faker.random.arrayElement([
      { label: 'Full', id: '#1' },
      { label: 'Empty', id: '#2' },
      { label: 'Half full', id: '#3' },
      { label: 'Half empty', id: '#4' },
      { label: 'Unknown', id: '#5' },
    ]),
    city: faker.random.arrayElement([
      { label: 'Rio de Janeiro', id: '#1' },
      { label: 'New York', id: '#2' },
      { label: 'Paris', id: '#3' },
      { label: 'Tokyo', id: '#4' },
      { label: 'Salvador', id: '#5' },
      { label: 'Porto', id: '#6' },
    ]),
    color: faker.random.arrayElement([
      { label: 'Black', id: '#1' },
      { label: 'White', id: '#2' },
      { label: 'Pink', id: '#3' },
      { label: 'Blue', id: '#4' },
      { label: 'Yellow', id: '#5' },
      { label: 'Brown', id: '#6' },
      { label: 'Orange', id: '#7' },
      { label: 'Red', id: '#8' },
    ]),
    origin: faker.random.arrayElement([
      { label: 'Rio de Janeiro', id: '#1' },
      { label: 'New York', id: '#2' },
      { label: 'Paris', id: '#3' },
      { label: 'Tokyo', id: '#4' },
      { label: 'Salvador', id: '#5' },
      { label: 'Porto', id: '#6' },
      { label: 'Oslo', id: '#7' },
      { label: 'London', id: '#8' },
    ]),
  }
})

// just a sample API
function api({
  color,
  origin,
  city,
  status,
}: {
  color?: string[]
  origin?: string
  city?: string[]
  status?: string
}) {
  let res = database

  console.log({ res })

  if (color?.length) {
    res = res.filter((item) => color.includes(item.color.id))
  }

  if (origin) {
    res = res.filter((item) => item.origin.id === origin)
  }

  if (city?.length) {
    res = res.filter((item) => city.includes(item.city.id))
  }

  if (status) {
    res = res.filter((item) => item.status.id === status)
  }

  return res
}

const StatusFilter = ({ state }: { state: any }) => {
  const list = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
    { label: 'Half empty', id: '#4' },
    { label: 'Unknown', id: '#5' },
  ]

  return (
    <>
      <FilterDisclosure state={state}>Status</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterListbox>
          {list.map((item) => (
            <FilterOptionRadio {...item} />
          ))}
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}

const CityFilter = ({ state }: { state: any }) => {
  const list = [
    { label: 'Rio de Janeiro', id: '#1' },
    { label: 'New York', id: '#2' },
    { label: 'Paris', id: '#3' },
    { label: 'Tokyo', id: '#4' },
    { label: 'Salvador', id: '#5' },
    { label: 'Porto', id: '#6' },
  ]

  return (
    <>
      <FilterDisclosure state={state}>City</FilterDisclosure>

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

const ColorFilter = ({ state }: { state: any }) => {
  return (
    <>
      <FilterDisclosure state={state}>Color</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterSearchbox />
        <FilterListbox>
          {state.matches.map((item: any) => (
            <FilterOptionCheckbox {...item} />
          ))}
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}

const OriginFilter = ({ state }: { state: any }) => {
  return (
    <>
      <FilterDisclosure state={state}>Color</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterSearchbox />
        <FilterListbox>
          {state.matches.map((item: any) => (
            <FilterOptionRadio {...item} />
          ))}
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}

export function BigExample() {
  const statusState = useFilterState()
  const cityState = useFilterMultipleState()
  const originState = useFilterState({
    searchableList: [
      { label: 'Rio de Janeiro', id: '#1' },
      { label: 'New York', id: '#2' },
      { label: 'Paris', id: '#3' },
      { label: 'Tokyo', id: '#4' },
      { label: 'Salvador', id: '#5' },
      { label: 'Porto', id: '#6' },
      { label: 'Oslo', id: '#7' },
      { label: 'London', id: '#8' },
    ],
  })

  const colorState = useFilterMultipleState({
    searchableList: [
      { label: 'Black', id: '#1' },
      { label: 'White', id: '#2' },
      { label: 'Pink', id: '#3' },
      { label: 'Blue', id: '#4' },
      { label: 'Yellow', id: '#5' },
      { label: 'Brown', id: '#6' },
      { label: 'Orange', id: '#7' },
      { label: 'Red', id: '#8' },
    ],
  })

  const filterGroupState = useFilterGroupState({
    filterStates: [statusState, cityState, originState, colorState],
  })

  const [list, setList] = useState<Item[]>([])

  useEffect(() => {
    setList(
      api({
        color: colorState.getFromApplied('id'),
        city: cityState.getFromApplied('id'),
        status: statusState.appliedItem?.id,
        origin: originState.appliedItem?.id,
      })
    )
  }, [
    statusState.appliedItem,
    cityState.appliedItems,
    originState.appliedItem,
    colorState.appliedItems,
  ])

  const columns = createColumns<Item>([
    {
      id: 'name',
      header: 'Product Name',
    },
    {
      id: 'color',
      header: 'Color',
      resolver: {
        type: 'text',
        columnType: 'name',
        mapText: (value) => value.color.label,
      },
    },
    {
      id: 'status',
      header: 'Status',
      resolver: {
        type: 'text',
        columnType: 'name',
        mapText: (value) => value.status.label,
      },
    },
    {
      id: 'city',
      header: 'City',
      resolver: {
        type: 'text',
        columnType: 'name',
        mapText: (value) => value.city.label,
      },
    },
    {
      id: 'origin',
      header: 'Origin',
      resolver: {
        type: 'text',
        columnType: 'name',
        mapText: (value) => value.origin.label,
      },
    },
  ])

  const grid = useTableState<Item>({
    columns,
    items: list,
  })

  return (
    <>
      <FilterGroup state={filterGroupState}>
        <StatusFilter state={statusState} />
        <CityFilter state={cityState} />
        <OriginFilter state={originState} />
        <ColorFilter state={colorState} />
      </FilterGroup>

      <Table state={grid} csx={{ width: 560 }} />
    </>
  )
}
