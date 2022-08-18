import React from 'react'

import { ComboboxItem } from 'ariakit'
import { Checkbox } from '../../checkbox'

import * as style from '../filter.style'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { usePopoverContext } from '../filter-popover-context'
import type { ComboboxMultipleState } from '../../combobox'
import type { FilterOption } from '../filter/filter.state'

export const FilterOptionCheckbox = createComponent<
  typeof ComboboxItem,
  FilterOptionCheckboxProps
>((props) => {
  const { id, value, label, ...restProps } = props
  const { state } = usePopoverContext()

  const item = { id, label, value }

  const combobox = state.combobox as ComboboxMultipleState<FilterOption<any>>

  return useElement(ComboboxItem, {
    baseStyle: style.option,
    children: (
      <>
        <Checkbox
          checked={combobox.isSelected(item)}
          aria-checked={undefined}
          csx={{ marginRight: '$m' }}
          readOnly
        />
        {label}
      </>
    ),
    'aria-selected': combobox.isSelected(item),
    onClick: () => combobox.onChange(item),
    id,
    ...restProps,
  })
})

interface FilterOptionCheckboxProps {
  id: string
  label: string
  value?: any
}
