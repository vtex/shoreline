import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'

import * as style from '../filter.style'

import { Box } from '../..'
import type { UseFilterStateReturn } from './filter.state'
import { FilterRadio } from './filter-radio'

export const FilterOptionRadio = (props: FilterOptionRadioProps) => {
  const {
    state: {
      combobox: { selectedItem, setSelectedItem },
    },
    id,
    children,
    value,
  } = props

  const isSelected = selectedItem?.id === id || false

  const item = { id, label: children, value }

  return (
    <Box
      as={ComboboxItem}
      aria-selected={isSelected}
      onClick={() => setSelectedItem(item)}
      id={id}
      csx={style.option}
    >
      <FilterRadio checked={isSelected} />
      {children}
    </Box>
  )
}

interface FilterOptionRadioProps {
  state: UseFilterStateReturn<any>
  id: string
  children: string
  value?: any
}
