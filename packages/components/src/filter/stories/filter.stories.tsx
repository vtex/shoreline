import '../../../dist/styles.min.css'
import '../filter.css'
import React, { useState, useMemo, startTransition } from 'react'
import { Popover, PopoverTrigger } from '../../popover'
import { Button } from '../../button'
import { Stack } from '../../stack'
import { SelectOption, SelectList, SelectOptionCheck } from '../../select'

import {
  FilterProvider,
  FilterApply,
  FilterClear,
  FilterPopover,
  FilterList,
  FilterOption,
  FilterValue,
  FilterTrigger,
  Filter,
} from '../index'
import { Content } from '../../content'
import { ScrollArea } from '../../scroll-area'
import type { Country } from './countries'
import { countries } from './countries'
import {
  Combobox,
  ComboboxProvider,
  ComboboxItem,
  ComboboxList,
} from '../../combobox'
import { matchSorter } from 'match-sorter'

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
  const [value, setValue] = useState<string[]>([])

  return (
    <Filter label="Status" value={value} setValue={setValue} defaultValue={[]}>
      <FilterOption value="Stable">Stable</FilterOption>
      <FilterOption value="Experimental">Experimental</FilterOption>
      <FilterOption value="Deprecated">Deprecated</FilterOption>
    </Filter>
  )
}

export function Expanded() {
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

export function Controlled() {
  const [status, setStatus] = useState<string>('Stable')

  return (
    <FilterProvider value={status} setValue={setStatus}>
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

export function Composition() {
  return (
    <FilterProvider defaultValue={[]}>
      <PopoverTrigger asChild>
        <Button>
          Filter
          <FilterValue />
        </Button>
      </PopoverTrigger>
      <FilterPopover>
        <ScrollArea
          style={{
            height: 256,
            width: '100%',
          }}
        >
          <FilterList>
            {countries.map((country) => (
              <FilterOption key={country.name} value={country.emoji}>
                {country.emoji} {country.name}
              </FilterOption>
            ))}
          </FilterList>
        </ScrollArea>
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
          <FilterOption key={country.name} value={country.emoji}>
            {country.emoji} {country.name}
          </FilterOption>
        ))
      ) : (
        <div>No results found</div>
      )}
    </Filter>
  )
}
