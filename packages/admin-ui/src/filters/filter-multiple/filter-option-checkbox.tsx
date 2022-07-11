import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'
import { Checkbox } from '../../checkbox'

import * as style from '../filter.style'
import { Box } from '../..'
import { usePopoverContext } from '../filter-popover-context'
import type { ComboboxMultipleState } from '../../combobox'
import type { FilterOption } from '../filter/filter.state'

export const FilterOptionCheckbox = (props: FilterOptionCheckboxProps) => {
  const { id, value, label } = props
  const { state } = usePopoverContext()

  const item = { id, label, value }

  const combobox = state.combobox as ComboboxMultipleState<FilterOption<any>>

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
  id: string
  label: string
  value?: any
}
