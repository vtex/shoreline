import React, { useEffect } from 'react'
import type { Meta } from '@storybook/react'

import {
  useFilterMultipleState,
  useFilterState,
  FilterSearch,
  FilterMultipleSearch,
} from '../index'

export default {
  title: 'admin-ui/FiltersSearch',
  component: FilterSearch,
} as Meta

export function Search() {
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
    onChange: ({ selected }) => console.log(`applied: ${selected}`),
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
  const state = useFilterMultipleState<{ label: string; id: string }>({
    items: [],
    label: 'teste',
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
