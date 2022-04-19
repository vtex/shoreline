import React from 'react'
import { tag, useSystem } from '@vtex/admin-ui-react'

import { BaseFilter } from './filter-base'
import { ComboboxItem } from '../combobox/combobox-item'
import { focusVisible, style } from '..'

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
    state: { combobox, appliedItem, items },
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

  const { cn } = useSystem()

  // TODO: Check the reason that we get a type error if the className is passed directly to Checkbox
  const styleProps: any = {
    className: cn(itemStyle),
  }

  return (
    <BaseFilter state={state} appliedValuesLabel={appliedValuesLabel}>
      {items.map((item) => (
        <ComboboxItem
          {...styleProps}
          aria-selected={item.id === currentSelectedId}
          key={item.id}
          value={item.id}
          focusOnHover
          hideOnClick={false}
          onClick={() => combobox.setSelectedItem(item) as any}
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
