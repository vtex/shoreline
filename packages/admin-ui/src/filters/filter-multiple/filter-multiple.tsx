import React from 'react'
import { Checkbox } from '../../checkbox'
import { BaseFilter } from '../filter-base'
import { ComboboxItem } from '../../combobox/combobox-item'

import type { UseFilterMultipleReturn } from './filter-multiple.state'

import * as style from '../filter.style'
import { FilterDisclosure } from '../filter-disclosure'

export function FilterMultiple<T>(props: FilterMultipleProps<T>) {
  const {
    state: {
      label: disclosureLabel,
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
    <>
      <FilterDisclosure state={state} appliedItems={appliedItems}>
        {disclosureLabel}
      </FilterDisclosure>
      <BaseFilter state={state}>
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
              label={getOptionLabel(item)}
              aria-readonly="true"
            />
          </ComboboxItem>
        ))}
      </BaseFilter>
    </>
  )
}

export interface FilterMultipleProps<T> {
  state: UseFilterMultipleReturn<T>
}
