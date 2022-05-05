import React from 'react'
import { tag } from '@vtex/admin-ui-react'

import { BaseFilter } from './filter-base'
import { ComboboxItem } from '../combobox/combobox-item'
import { focusVisible, style } from '@vtex/admin-ui-core'

import type { UseFilterStateReturn } from './filter.state'
import { FilterRadio } from './filter-radio'
import type { FilterItem } from '.'

export const itemStyle = style({
  display: 'flex',
  cursor: 'pointer',
  ...focusVisible('main'),
})

export function Filter<T extends FilterItem>(props: FilterProps<T>) {
  const {
    state: { combobox, appliedItem, items, baseId },
    state,
  } = props

  const currentSelectedId = combobox.selectedItem?.id

  const appliedValuesLabel = appliedItem && (
    <>
      <span>:</span>
      <tag.span
        csx={{
          color: '$primary',
          marginLeft: '$s',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '300px',
        }}
      >
        {appliedItem.label}
      </tag.span>
    </>
  )

  return (
    <BaseFilter state={state} appliedValuesLabel={appliedValuesLabel}>
      {items.map((item) => (
        <ComboboxItem
          aria-selected={item.id === currentSelectedId}
          key={item.id}
          value={item.id}
          focusOnHover
          hideOnClick={false}
          onClick={() => combobox.setSelectedItem(item)}
          style={itemStyle}
          id={`${baseId ?? ''}-item-${item.id}`}
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
