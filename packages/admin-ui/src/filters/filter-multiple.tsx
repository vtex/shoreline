import React from 'react'
import { Checkbox } from '../checkbox'
import { BaseFilter } from './filter-base'
import { ComboboxItem } from '../combobox/combobox-item'
import { MultipleItemsLabel } from './MultipleItemsLabel'

import type { UseFilterMultipleReturn } from './filter-multiple.state'

import * as style from './filter.style'

export function FilterMultiple<T>(props: FilterMultipleProps<T>) {
  const {
    state: {
      appliedItems,
      items,
      combobox,
      baseId,
      getOptionId,
      getOptionLabel,
    },
    state,
  } = props

  return (
    <BaseFilter
      state={state}
      appliedValuesLabel={
        <MultipleItemsLabel appliedItems={appliedItems} state={state} />
      }
    >
      {items.map((item) => (
        <ComboboxItem
          aria-selected={combobox.isSelected(item)}
          key={getOptionId(item)}
          onClick={() => combobox.onChange(item)}
          style={style.option}
          id={`${baseId ?? ''}-item-${getOptionId(item)}`}
        >
          <Checkbox
            id={getOptionId(item)}
            checked={combobox.isSelected(item)}
            aria-checked={undefined}
            csx={{ marginRight: '$s' }}
            aria-readonly="true"
          />
          {getOptionLabel(item)}
        </ComboboxItem>
      ))}
    </BaseFilter>
  )
}

export interface FilterMultipleProps<T> {
  state: UseFilterMultipleReturn<T>
}
