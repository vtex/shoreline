import React, { useEffect, useState } from 'react'
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
  title: 'admin-ui/Filters/status',
  component: FilterSearchbox,
} as Meta

// just a sample API
function api(search?: string, delay = 1000): Promise<any[]> {
  const items = [
    { country: 'Brazil', id: '1' },
    { country: 'Bahamas', id: '2' },
    { country: 'Belarus', id: '3' },
    { country: 'France', id: '4' },
    { country: 'Ukraine', id: '5' },
    { country: 'Australia', id: '6' },
    { country: 'Afghanistan', id: '7' },
    { country: 'Albania', id: '8' },
    { country: 'Algeria', id: '9' },
    { country: 'American Samoa', id: '10' },
    { country: 'Andorra', id: '11' },
    { country: 'Angola', id: '12' },
    { country: 'Anguilla', id: '13' },
    { country: 'Antarctica', id: '14' },
    { country: 'Antigua and Barbuda', id: '15' },
    { country: 'Argentina', id: '16' },
    { country: 'Armenia', id: '17' },
    { country: 'Aruba', id: '18' },
    { country: 'Austria', id: '19' },
    { country: 'Azerbaijan', id: '20' },
  ]

  const res = search
    ? items.filter((item) =>
        item.country.toLowerCase().startsWith(search.toLowerCase())
      )
    : items

  return new Promise((resolve) => setTimeout(resolve, delay, res))
}

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
        <FilterSearchbox id="boxy" />
        <FilterListbox>
          {filterState.matches.map((item) => (
            <FilterOptionRadio id={item.id} label={item.label} />
          ))}
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}

export function EmptySearchExample() {
  const state = useFilterMultipleState()
  const [result, setResult] = useState<Array<{ id: string; country: string }>>()
  const [loadingSearch, setLoadingSearch] = useState(false)

  useEffect(() => {
    setLoadingSearch(true)
    api(state.deferredSearchValue).then((res) => {
      setResult(res)
      setLoadingSearch(false)
      state.setStatus(res.length ? 'ready' : 'not-found')
    })
  }, [state.deferredSearchValue])

  return (
    <>
      <FilterDisclosure state={state}>Controlled empty state</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterSearchbox id="s" loading={loadingSearch} />
        <FilterListbox>
          {result?.map((item) => (
            <FilterOptionCheckbox id={item.id} label={item.country} />
          ))}
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}

export function ErrorSearchExample() {
  const state = useFilterMultipleState()
  const [result, setResult] = useState<Array<{ id: string; country: string }>>()
  const [loadingSearch, setLoadingSearch] = useState(false)

  useEffect(() => {
    setLoadingSearch(true)
    api(state.deferredSearchValue).then((res) => {
      setResult(res)
      setLoadingSearch(false)
      state.setStatus('error')
    })
  }, [state.deferredSearchValue])

  return (
    <>
      <FilterDisclosure state={state}>Controlled empty state</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterSearchbox id="error" loading={loadingSearch} />
        <FilterListbox>
          {result?.map((item) => (
            <FilterOptionCheckbox id={item.id} label={item.country} />
          ))}
        </FilterListbox>
        <FilterFooter />
      </FilterPopover>
    </>
  )
}
