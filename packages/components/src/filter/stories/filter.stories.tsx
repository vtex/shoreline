import React, { useState, useMemo, startTransition } from 'react'
import { matchSorter } from 'match-sorter'

import {
  FilterProvider,
  FilterPopover,
  FilterList,
  FilterListSkeleton,
  FilterItem,
  FilterTrigger,
  Filter,
} from '../index'
import type { Country } from './countries'
import { countries } from './countries'
import { LocaleProvider } from '@vtex/shoreline-primitives'

export default {
  title: 'shoreline-components/filter',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Default() {
  return (
    <Filter label="Status">
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

export function Multiple() {
  return (
    <Filter label="Status" defaultValue={[]}>
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

export function Controlled() {
  const [status, setStatus] = useState<string>('Experimental')

  return (
    <Filter label="Status" value={status} setValue={setStatus}>
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

export function CustomMessages() {
  return (
    <Filter
      label="Status"
      messages={{
        apply: 'APL',
        clear: 'CL',
      }}
    >
      <FilterItem value="Stable">Stable</FilterItem>
      <FilterItem value="Experimental">Experimental</FilterItem>
      <FilterItem value="Deprecated">Deprecated</FilterItem>
    </Filter>
  )
}

export function Localization() {
  return (
    <LocaleProvider locale="ja-JP">
      <Filter label="Status">
        <FilterItem value="Stable">Stable</FilterItem>
        <FilterItem value="Experimental">Experimental</FilterItem>
        <FilterItem value="Deprecated">Deprecated</FilterItem>
      </Filter>
    </LocaleProvider>
  )
}

export function Composition() {
  return (
    <FilterProvider>
      <FilterTrigger>Status</FilterTrigger>
      <FilterPopover>
        <FilterList>
          <FilterItem value="Stable">Stable</FilterItem>
          <FilterItem value="Experimental">Experimental</FilterItem>
          <FilterItem value="Deprecated">Deprecated</FilterItem>
        </FilterList>
      </FilterPopover>
    </FilterProvider>
  )
}

export function WithCombobox() {
  const [searchValue, setSearchValue] = useState('')

  const matches = useMemo<Country[]>(() => {
    return matchSorter(countries, searchValue, {
      keys: ['name', 'code'],
    })
  }, [searchValue])

  return (
    <Filter
      label="Country"
      defaultValue={[]}
      setSearchValue={(value) => {
        startTransition(() => {
          setSearchValue(value)
        })
      }}
    >
      {matches.length ? (
        matches.map((country) => (
          <FilterItem
            key={country.name}
            value={`${country.emoji} ${country.name}`}
          >
            {country.emoji} {country.name}
          </FilterItem>
        ))
      ) : (
        <div>No results found</div>
      )}
    </Filter>
  )
}

export function Loading() {
  return (
    <Filter label="Country">
      <FilterListSkeleton />
    </Filter>
  )
}
