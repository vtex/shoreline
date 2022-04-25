import React from 'react'

import { BaseFilter } from './filter-base'
import { ComboboxItem } from '../combobox/combobox-item'

import type { UseFilterStateReturn } from './filter.state'
import { FilterRadio } from './filter-radio'
import type { FilterItem } from '.'
import { itemStyle } from '.'

import { FilterSeachbox } from './filter-searchbox'
import { SingleItemLabel } from './SingleItemLabel'

export function FilterSearch<T extends FilterItem>(props: FilterProps<T>) {
  const {
    state: { combobox, appliedItem },
    state,
  } = props

  const currentSelectedId = combobox.selectedItem?.id

  return (
    <BaseFilter
      state={state}
      appliedValuesLabel={
        appliedItem && <SingleItemLabel appliedItem={appliedItem} />
      }
    >
      {<FilterSeachbox state={combobox} id="hdd" />}
      {combobox.matches.map((item) => (
        <ComboboxItem
          aria-selected={item.id === currentSelectedId}
          key={item.id}
          focusOnHover
          hideOnClick={false}
          onClick={() => combobox.setSelectedItem(item)}
          style={itemStyle}
        >
          <FilterRadio
            checked={!!(item.id && item.id === combobox.selectedItem?.id)}
          />
          {item.label}
        </ComboboxItem>
      ))}
    </BaseFilter>
  )
}

export interface FilterProps<T> {
  state: UseFilterStateReturn<T>
}
