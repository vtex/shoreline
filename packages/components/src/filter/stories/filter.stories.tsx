import React, { useState, useMemo, startTransition } from 'react'
import { matchSorter } from 'match-sorter'

import {
  FilterProvider,
  FilterPopover,
  FilterList,
  FilterOption,
  FilterTrigger,
  Filter,
} from '../index'
import type { Country } from './countries'
import { countries } from './countries'
import { LocaleProvider } from '../../locale'

export default {
  title: 'shoreline-components/filter',
}

export function Default() {
  return (
    <Filter label="Status">
      <FilterOption value="Stable">Stable</FilterOption>
      <FilterOption value="Experimental">Experimental</FilterOption>
      <FilterOption value="Deprecated">Deprecated</FilterOption>
    </Filter>
  )
}

export function Multiple() {
  return (
    <Filter label="Status" defaultValue={[]}>
      <FilterOption value="Stable">Stable</FilterOption>
      <FilterOption value="Experimental">Experimental</FilterOption>
      <FilterOption value="Deprecated">Deprecated</FilterOption>
    </Filter>
  )
}

export function Controlled() {
  const [status, setStatus] = useState<string>('Experimental')

  return (
    <Filter label="Status" value={status} setValue={setStatus}>
      <FilterOption value="Stable">Stable</FilterOption>
      <FilterOption value="Experimental">Experimental</FilterOption>
      <FilterOption value="Deprecated">Deprecated</FilterOption>
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
      <FilterOption value="Stable">Stable</FilterOption>
      <FilterOption value="Experimental">Experimental</FilterOption>
      <FilterOption value="Deprecated">Deprecated</FilterOption>
    </Filter>
  )
}

export function Localization() {
  return (
    <LocaleProvider locale="ja-JP">
      <Filter label="Status">
        <FilterOption value="Stable">Stable</FilterOption>
        <FilterOption value="Experimental">Experimental</FilterOption>
        <FilterOption value="Deprecated">Deprecated</FilterOption>
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
          <FilterOption value="Stable">Stable</FilterOption>
          <FilterOption value="Experimental">Experimental</FilterOption>
          <FilterOption value="Deprecated">Deprecated</FilterOption>
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
          <FilterOption
            key={country.name}
            value={`${country.emoji} ${country.name}`}
          >
            {country.emoji} {country.name}
          </FilterOption>
        ))
      ) : (
        <div>No results found</div>
      )}
    </Filter>
  )
}
