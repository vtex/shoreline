import React from 'react'

import { BaseFilter } from './filter-base'
import { ComboboxItem } from '../combobox/combobox-item'
import { focusVisible, style } from '@vtex/admin-ui-core'

import type { UseFilterStateReturn } from './filter.state'
import { FilterRadio } from './filter-radio'
import type { FilterItem } from '.'
import { SingleItemLabel } from './SingleItemLabel'

export const itemStyle = style({
  display: 'flex',
  cursor: 'pointer',
  ...focusVisible('main'),
})

export function Filter<T extends FilterItem>(props: FilterProps<T>) {
  const {
    state: { combobox, appliedItem, items },
    state,
  } = props

  const currentSelectedId = combobox.selectedItem?.id

  return (
    <BaseFilter
      state={state}
      appliedValuesLabel={<SingleItemLabel appliedItem={appliedItem} />}
    >
      {items.map((item) => (
        <ComboboxItem
          aria-selected={item.id === currentSelectedId}
          key={item.id}
          value={item.id}
          focusOnHover
          hideOnClick={false}
          onClick={() => combobox.setSelectedItem(item)}
          style={itemStyle}
        >
          <FilterRadio checked={item.id === currentSelectedId} />
          {item.label}
        </ComboboxItem>
      ))}
    </BaseFilter>
  )
}

export interface FilterProps<T> {
  state: UseFilterStateReturn<T>
}
