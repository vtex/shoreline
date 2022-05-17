import React, { useEffect } from 'react'
import type { Meta } from '@storybook/react'

import {
  useFilterMultipleState,
  useFilterState,
  FilterSearch,
  FilterMultipleSearch,
  useFilterGroupState,
  FilterGroup,
} from '../index'

export default {
  title: 'admin-ui/FiltersSearch',
  component: FilterSearch,
} as Meta

export function MultipleSearch() {
  const state = useFilterMultipleState({
    items: [
      { label: 'Rio de Janeiro', id: '#1' },
      { label: 'Rio de Janeiro', id: '#01' },
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
    onChange: ({ selected }) => console.log({ selected }),
    label: 'City',
  })

  return <FilterMultipleSearch state={state} />
}

export function SingleSearch() {
  const state = useFilterState({
    items: [
      { label: 'Rio de Janeiro', id: '#1' },
      { label: 'Rio de Janeiro', id: '#01' },
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

// fake request
const searchItems = (search: string, delay = 1000) => {
  const items = [
    { value: 'Brazil' },
    { value: 'Bahamas' },
    { value: 'Belarus' },
    { value: 'France' },
    { value: 'Ukraine' },
    { value: 'Australia' },
    { value: 'Afghanistan' },
    { value: 'Albania' },
    { value: 'Algeria' },
    { value: 'American Samoa' },
    { value: 'Andorra' },
    { value: 'Angola' },
    { value: 'Anguilla' },
    { value: 'Antarctica' },
    { value: 'Antigua and Barbuda' },
    { value: 'Argentina' },
    { value: 'Armenia' },
    { value: 'Aruba' },
    { value: 'Austria' },
    { value: 'Azerbaijan' },
  ]

  const res = !search
    ? items
    : items.filter((item) =>
        item.value.toLowerCase().includes(search.toLowerCase())
      )

  const realDelay = !search ? 200 : delay

  return new Promise<any[]>((resolve) =>
    setTimeout(resolve, realDelay, res as any[])
  )
}

export const Async = () => {
  const state = useFilterState<{ value: string }>({
    items: [],
    label: 'City',
    getOptionId: (option) => option.value,
    getOptionLabel: (option) => option.value,
  })

  const { combobox } = state

  useEffect(() => {
    if (state.combobox.deferredValue === '') {
      combobox.setLoading(true)
      searchItems('').then((res) => {
        combobox.setMatches(res)
        state.combobox.setLoading(false)
      })
    } else {
      state.combobox.setLoading(true)
      searchItems(state.combobox.deferredValue).then((res) => {
        combobox.setMatches(res)
        combobox.setLoading(false)
      })
    }
  }, [combobox.deferredValue])

  return <FilterSearch state={state} />
}

export const AsyncMultiple = () => {
  const state = useFilterMultipleState<{ label: string; id: string }>({
    items: [],
    label: 'Async city',
  })

  useEffect(() => {
    if (state.combobox.deferredValue === '') {
      searchItems('').then((res) => {
        state.combobox.setMatches(
          res.map(({ value }) => ({ label: value, id: value }))
        )
        state.combobox.setLoading(false)
      })
    } else {
      state.combobox.setLoading(true)
      searchItems(state.combobox.deferredValue).then((res) => {
        state.combobox.setMatches(
          res.map(({ value }) => ({ label: value, id: value }))
        )
        state.combobox.setLoading(false)
      })
    }
  }, [state.combobox.deferredValue])

  return <FilterMultipleSearch state={state} />
}

export const Group = () => {
  const fullList = [
    { name: 'Rio de Janeiro', uniqueId: '#1' },
    { name: 'New York', uniqueId: '#2' },
    { name: 'Paris', uniqueId: '#3' },
    { name: 'Tokyo', uniqueId: '#4' },
    { name: 'São Paulo', uniqueId: '#5' },
    { name: 'Berlin', uniqueId: '#7' },
    { name: 'Washington', uniqueId: '#8' },
    { name: 'Lisboa', uniqueId: '#9' },
    { name: 'Porto', uniqueId: '#10' },
    { name: 'João Pessoa', uniqueId: '#11' },
    { name: 'Salvador', uniqueId: '#12' },
    { name: 'Barcelona', uniqueId: '#13' },
  ]

  const state = useFilterMultipleState({
    items: fullList,
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Multiple',
    getOptionId: (option) => option.uniqueId,
    getOptionLabel: (option) => option.name,
  })

  const state2 = useFilterState({
    items: fullList,
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Simple',
    getOptionId: (option) => option.uniqueId,
    getOptionLabel: (option) => option.name,
  })

  const state3 = useFilterMultipleState({
    items: fullList,
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Multiple with initial',
    getOptionId: (option) => option.uniqueId,
    getOptionLabel: (option) => option.name,
  })

  const state4 = useFilterState({
    items: fullList,
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
    label: 'Simple with initial',
    getOptionId: (option) => option.uniqueId,
    getOptionLabel: (option) => option.name,
  })

  const filterGroupState = useFilterGroupState({
    filterStates: [state, state2, state3, state4],
  })

  useEffect(() => {
    state3.setAppliedItems([fullList[0], fullList[3]])
    state4.setAppliedItem(fullList[2])
  }, [])

  return (
    <FilterGroup state={filterGroupState}>
      <FilterMultipleSearch state={state} />
      <FilterSearch state={state2} />
      <FilterMultipleSearch state={state3} />
      <FilterSearch state={state4} />
    </FilterGroup>
  )
}
