import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'
import { Checkbox } from '../../checkbox'

import type { UseFilterMultipleReturn } from './filter-multiple.state'

import * as style from '../filter.style'
import { Box } from '../..'

export const FilterOptionCheckbox = (props: FilterOptionCheckboxProps) => {
  const {
    state: { combobox },
    id,
    children,
    value,
  } = props

  const item = { id, label: children, value }

  return (
    <Box
      as={ComboboxItem}
      aria-selected={combobox.isSelected(item)}
      onClick={() => combobox.onChange(item)}
      id={id}
      csx={style.option}
    >
      <Checkbox
        checked={combobox.isSelected(item)}
        aria-checked={undefined}
        label={children}
        readOnly
      />
    </Box>
  )
}

interface FilterOptionCheckboxProps {
  state: UseFilterMultipleReturn<any>
  id: string
  children: string
  value?: any
}
