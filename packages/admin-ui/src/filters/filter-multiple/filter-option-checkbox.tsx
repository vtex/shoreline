import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'
import { Checkbox } from '../../checkbox'

import type { UseFilterMultipleReturn } from './filter-multiple.state'

import * as style from '../filter.style'
import { useSystem } from '../..'

export const FilterOptionCheckbox = (props: {
  state: UseFilterMultipleReturn<any>
  id: string
  children: string
  value?: any
}) => {
  const {
    state: { combobox },
    id,
    children,
    value,
  } = props

  const { cn } = useSystem()

  const item = { id, label: children, value }

  return (
    <ComboboxItem
      aria-selected={combobox.isSelected(item)}
      onClick={() => combobox.onChange(item)}
      id={id}
      className={cn(style.option)}
    >
      <Checkbox
        checked={combobox.isSelected(item)}
        aria-checked={undefined}
        label={children}
        readOnly
      />
    </ComboboxItem>
  )
}
