import '../../../dist/styles.min.css'
import '../filter.css'
import React, { useState, useMemo, startTransition } from 'react'
import { Popover, PopoverTrigger } from '../../popover'
import { Button } from '../../button'
import { Stack } from '../../stack'
import { SelectOption, SelectList, SelectOptionCheck } from '../../select'

import { FilterValue } from '../filter'
import { FilterProvider, FilterApply, FilterClear } from '../index'
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
    <FilterProvider defaultSelect={[]} defaultFilter={[]}>
      <PopoverTrigger asChild>
        <Button>
          Filter:
          <FilterValue />
        </Button>
      </PopoverTrigger>
      <Popover
        style={{
          width: 256,
        }}
      >
        <Content>
          <Stack fluid>
            <ScrollArea
              style={{
                height: 256,
                width: '100%',
              }}
            >
              <SelectList>
                {countries.map((country) => (
                  <SelectOption key={country.name} value={country.emoji}>
                    {country.emoji} {country.name}
                  </SelectOption>
                ))}
              </SelectList>
            </ScrollArea>
            <Stack direction="row" fluid>
              <FilterClear>Clear</FilterClear>
              <FilterApply>Apply</FilterApply>
            </Stack>
          </Stack>
        </Content>
      </Popover>
    </FilterProvider>
  )
}

export function Composition() {
  return (
    <FilterProvider defaultSelect={[]} defaultFilter={[]}>
      <PopoverTrigger asChild>
        <Button>
          Filter:
          <FilterValue />
        </Button>
      </PopoverTrigger>
      <Popover
        style={{
          width: 256,
        }}
      >
        <Content>
          <Stack fluid>
            <ScrollArea
              style={{
                height: 256,
                width: '100%',
              }}
            >
              <SelectList>
                {countries.map((country) => (
                  <SelectOption key={country.name} value={country.emoji}>
                    {country.emoji} {country.name}
                  </SelectOption>
                ))}
              </SelectList>
            </ScrollArea>
            <Stack direction="row" fluid>
              <FilterClear asChild>
                <Button>Clear</Button>
              </FilterClear>
              <FilterApply asChild>
                <Button variant="primary">Apply</Button>
              </FilterApply>
            </Stack>
          </Stack>
        </Content>
      </Popover>
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
    <ComboboxProvider
      resetValueOnHide
      setValue={(value) => {
        startTransition(() => {
          setSearchValue(value)
        })
      }}
    >
      <FilterProvider defaultSelect={[]} defaultFilter={[]}>
        <PopoverTrigger asChild>
          <Button>
            Filter:
            <FilterValue />
          </Button>
        </PopoverTrigger>
        <Popover
          style={{
            width: 256,
          }}
        >
          <Content>
            <Stack fluid>
              <div>
                <Combobox
                  data-sl-text-input
                  autoSelect
                  placeholder="Search..."
                />
              </div>
              <ScrollArea
                style={{
                  height: 256,
                  width: '100%',
                }}
              >
                <ComboboxList>
                  {matches.length ? (
                    matches.map((country) => (
                      <SelectOption
                        key={country.name}
                        value={country.emoji}
                        asChild
                      >
                        <ComboboxItem>
                          {country.emoji} {country.name} <SelectOptionCheck />
                        </ComboboxItem>
                      </SelectOption>
                    ))
                  ) : (
                    <div>No results found</div>
                  )}
                </ComboboxList>
              </ScrollArea>
              <Stack direction="row" fluid>
                <FilterClear />
                <FilterApply />
              </Stack>
            </Stack>
          </Content>
        </Popover>
      </FilterProvider>
    </ComboboxProvider>
  )
}
