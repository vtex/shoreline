import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'

import * as style from '../filter.style'

import { useSystem } from '../..'
import type { UseFilterStateReturn } from './filter.state'
import { FilterRadio } from './filter-radio'

export const FilterOptionRadio = (props: {
  state: UseFilterStateReturn<any>
  id: string
  children: string
  value?: any
}) => {
  const {
    state: {
      combobox: { selectedItem, setSelectedItem },
    },
    id,
    children,
    value,
  } = props

  const { cn } = useSystem()

  const isSelected = selectedItem?.id === id || false

  const item = { id, label: children, value }

  return (
    <ComboboxItem
      aria-selected={isSelected}
      onClick={() => setSelectedItem(item)}
      id={id}
      className={cn(style.option)}
    >
      <FilterRadio checked={isSelected} />
      {children}
    </ComboboxItem>
  )
}
