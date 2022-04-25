import React from 'react'

import { Checkbox } from '../components/Checkbox'
import { BaseFilter } from './filter-base'

import type { UseFilterMultipleReturn } from './filter-multiple.state'
import { itemStyle } from './filter'
import type { FilterItem } from '.'
import { ComboboxItem } from '../combobox/combobox-item'
import { FilterSeachbox } from './filter-searchbox'
import { MultipleItemsLabel } from './MultipleItemsLabel'

export function FilterMultipleSearch<T extends FilterItem>(
  props: FilterMultipleProps<T>
) {
  const {
    state: { appliedItems, combobox },
    state,
  } = props

  return (
    <BaseFilter
      state={state}
      appliedValuesLabel={<MultipleItemsLabel appliedItems={appliedItems} />}
    >
      <FilterSeachbox state={combobox} id="hdd" />
      {combobox.matches.map((item) => (
        <ComboboxItem
          aria-selected={combobox.isSelected(item)}
          key={item.id}
          onClick={() => combobox.onChange(item)}
          style={itemStyle}
        >
          <Checkbox
            checked={combobox.isSelected(item)}
            aria-checked={undefined}
            csx={{ marginRight: '$s' }}
            readOnly
          />
          {item.label}
        </ComboboxItem>
      ))}
    </BaseFilter>
  )
}

export interface FilterMultipleProps<T> {
  state: UseFilterMultipleReturn<T>
}
