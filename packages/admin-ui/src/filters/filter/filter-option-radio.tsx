import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'

import * as style from '../filter.style'

import { Box } from '../..'
import { FilterRadio } from './filter-radio'
import { usePopoverContext } from '../filter-popover-context'

export const FilterOptionRadio = (props: FilterOptionRadioProps) => {
  const { state } = usePopoverContext()
  const { id, label, value } = props

  const { selectedItem, setSelectedItem } = state.combobox

  const isSelected = selectedItem?.id === id || false

  const item = { id, label, value }

  return (
    <Box
      as={ComboboxItem}
      aria-selected={isSelected}
      onClick={() => setSelectedItem(item)}
      id={id}
      csx={style.option}
    >
      <FilterRadio checked={isSelected} />
      {label}
    </Box>
  )
}

interface FilterOptionRadioProps {
  id: string
  label: string
  value?: any
}
