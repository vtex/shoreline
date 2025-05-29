import { matchSorter } from 'match-sorter'
import { startTransition, useMemo, useState } from 'react'

import { EmptyState, Heading, Text } from '../..'
import { IconMagnifyingGlass } from '../../../icons'
import { EmptyStateIllustration } from '../../empty-state'
import { LocaleProvider } from '../../locale'
import {
  Filter,
  FilterItem,
  FilterList,
  FilterPopover,
  FilterProvider,
  FilterTrigger,
} from '../index'
import type { Country } from './countries'
import { countries } from './countries'

export default {
  title: 'components/filter',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
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

export function CustomLabel() {
  const [city, setCity] = useState<string>('')

  return (
    <Filter label="Cidade" value={city} setValue={setCity}>
      <FilterItem value="rj">Rio de Janeiro</FilterItem>
      <FilterItem value="sp">São Paulo</FilterItem>
      <FilterItem value="mg">Minas Gerais</FilterItem>
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
        <EmptyState size="small" style={{ height: '15rem' }}>
          <EmptyStateIllustration>
            <IconMagnifyingGlass color="var(--sl-color-gray-8)" />
          </EmptyStateIllustration>
          <Heading>No results found</Heading>
          <Text variant="body">Try using different terms.</Text>
        </EmptyState>
      )}
    </Filter>
  )
}
