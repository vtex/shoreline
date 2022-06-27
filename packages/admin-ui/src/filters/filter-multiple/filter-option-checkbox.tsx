import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'
import { Checkbox } from '../../checkbox'

import type { UseFilterMultipleReturn } from './filter-multiple.state'

import * as style from '../filter.style'
import type { AnyObject } from '../..'
import { useSystem } from '../..'

export const FilterOptionCheckbox = (props: {
  state: UseFilterMultipleReturn<any>
  id?: string
  item: AnyObject
}) => {
  const {
    state: { combobox, getOptionId, getOptionLabel },
    id,
    item,
  } = props

  const { cn } = useSystem()

  return (
    <ComboboxItem
      aria-selected={combobox.isSelected(item)}
      onClick={() => combobox.onChange(item)}
      id={id || getOptionId(item)}
      className={cn(style.option)}
    >
      <Checkbox
        checked={combobox.isSelected(item)}
        aria-checked={undefined}
        label={getOptionLabel(item)}
        readOnly
      />
    </ComboboxItem>
  )
}
