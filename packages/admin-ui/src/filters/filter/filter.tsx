import React from 'react'

import { BaseFilter } from '../filter-base'
import { ComboboxItem } from '../../combobox/combobox-item'
import type { UseFilterStateReturn } from './filter.state'
import { FilterRadio } from './filter-radio'
import { FilterDisclosure } from '../filter-disclosure'

import * as style from '../filter.style'

export function Filter<T>(props: FilterProps<T>) {
  const {
    state: {
      combobox,
      appliedItem,
      items,
      baseId,
      getOptionLabel,
      getOptionId,
      label: disclosureLabel,
    },
    state,
  } = props

  const currentSelectedId =
    combobox.selectedItem && getOptionId(combobox.selectedItem)

  return (
    <>
      <FilterDisclosure
        state={state}
        appliedItems={appliedItem ? [appliedItem] : []}
      >
        {disclosureLabel}
      </FilterDisclosure>
      <BaseFilter state={state}>
        {items.map((item) => {
          const itemId = getOptionId(item)

          return (
            <ComboboxItem
              aria-selected={itemId === currentSelectedId}
              key={itemId}
              value={itemId}
              focusOnHover
              hideOnClick={false}
              onClick={() => combobox.setSelectedItem(item)}
              style={style.option}
              id={`${baseId ?? ''}-item-${itemId}`}
            >
              <FilterRadio checked={itemId === currentSelectedId} />
              {getOptionLabel(item)}
            </ComboboxItem>
          )
        })}
      </BaseFilter>
    </>
  )
}

export interface FilterProps<T> {
  state: UseFilterStateReturn<T>
}
