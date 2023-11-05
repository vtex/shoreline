import '../../../dist/styles.min.css'
import '../filter.css'
import type { ReactNode } from 'react'
import React, { useState, useContext, createContext } from 'react'
import {
  Popover,
  PopoverProvider,
  PopoverTrigger,
  PopoverDismiss,
} from '../../popover'
import { Button } from '../../button'
import { Stack } from '../../stack'
import { useSelectStore } from '@ariakit/react'
import { SelectProvider, SelectOption, SelectList } from '../../select'

import {
  FilterProvider,
  FilterApply,
  FilterClear,
  FilterValue,
} from '../filter'
import { Content } from '../../content'
import { ScrollArea } from '../../scroll-area'
import { countryArray, countryMap } from './data'

export default {
  title: 'shoreline-components/filter',
}

export function Default() {
  return (
    <FilterProvider>
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
                {countryArray.slice(0, 30).map((country) => (
                  <SelectOption key={country.name} value={country.emoji}>
                    {country.emoji} {country.name}
                  </SelectOption>
                ))}
              </SelectList>
            </ScrollArea>
            <Stack direction="row" fluid>
              <FilterClear />
              <FilterApply />
            </Stack>
          </Stack>
        </Content>
      </Popover>
    </FilterProvider>
  )
}
