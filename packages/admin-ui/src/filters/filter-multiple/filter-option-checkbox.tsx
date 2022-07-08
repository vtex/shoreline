import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'
import { Checkbox } from '../../checkbox'

import type { UseFilterMultipleReturn } from './filter-multiple.state'

import * as style from '../filter.style'
import { Box } from '../..'
import { usePopoverContext } from '../filter-popover-context'
import type { ComboboxMultipleState } from '../../combobox'
import type { FilterOption } from '../filter/filter.state'

export const FilterOptionCheckbox = (props: FilterOptionCheckboxProps) => {
  const { state: propState, id, value, label } = props
  const { state } = usePopoverContext()

  const item = { id, label, value }

  const combobox =
    propState?.combobox ??
    (state.combobox as ComboboxMultipleState<FilterOption<any>>)

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
        label={label}
        readOnly
      />
    </Box>
  )
}

interface FilterOptionCheckboxProps {
  state?: UseFilterMultipleReturn<any>
  id: string
  label: string
  value?: any
}
