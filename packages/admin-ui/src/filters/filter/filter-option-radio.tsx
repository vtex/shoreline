import React from 'react'

import type { AnyObject } from 'packages/admin-ui/dist/declarations-util/src'

import { ComboboxItem } from 'ariakit/combobox'

import * as style from '../filter.style'
import { useSystem } from '../..'
import type { UseFilterStateReturn } from './filter.state'
import { FilterRadio } from './filter-radio'

export const FilterOptionRadio = (props: {
  state: UseFilterStateReturn<any>
  id?: string
  item: AnyObject
}) => {
  const {
    state: {
      combobox: { selectedItem, setSelectedItem },
      getOptionId,
      getOptionLabel,
    },
    id,
    item,
  } = props

  const { cn } = useSystem()

  const isSelected =
    selectedItem && getOptionId(selectedItem) === getOptionId(item)

  return (
    <ComboboxItem
      aria-selected={isSelected}
      onClick={() => setSelectedItem(item)}
      id={id || getOptionId(item)}
      className={cn(style.option)}
    >
      <FilterRadio checked={isSelected} />
      {getOptionLabel(item)}
    </ComboboxItem>
  )
}
