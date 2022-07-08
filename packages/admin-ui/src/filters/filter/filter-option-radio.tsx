import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'

import * as style from '../filter.style'

import { Box } from '../..'
import type { FilterOption, UseFilterStateReturn } from './filter.state'
import { FilterRadio } from './filter-radio'
import { usePopoverContext } from '../filter-popover-context'
import type { ComboboxState } from '../../combobox'

export const FilterOptionRadio = (props: FilterOptionRadioProps) => {
  const { state } = usePopoverContext()
  const { state: propState, id, children, value } = props

  const combobox =
    propState?.combobox ?? (state.combobox as ComboboxState<FilterOption<any>>)

  const { selectedItem, setSelectedItem } = combobox

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
  state?: UseFilterStateReturn<any>
  id: string
  children: string
  value?: any
}
