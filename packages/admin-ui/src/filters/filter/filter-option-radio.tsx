import React from 'react'

import { ComboboxItem } from 'ariakit/combobox'

import * as style from '../filter.style'

import { createComponent, useElement } from '@vtex/admin-ui-react'
import { FilterRadio } from './filter-radio'
import { usePopoverContext } from '../filter-popover-context'

export const FilterOptionRadio = createComponent<
  typeof ComboboxItem,
  FilterOptionRadioProps
>((props) => {
  const { state } = usePopoverContext()
  const { id, label, value, ...restProps } = props

  const { selectedItem, setSelectedItem } = state.combobox

  const isSelected = selectedItem?.id === id || false

  const item = { id, label, value }

  return useElement(ComboboxItem, {
    baseStyle: style.option,
    children: (
      <>
        <FilterRadio checked={isSelected} />
        {label}
      </>
    ),
    'aria-selected': isSelected,
    onClick: () => setSelectedItem(item),
    id,
    ...restProps,
  })
})

interface FilterOptionRadioProps {
  id: string
  label: string
  value?: any
}
