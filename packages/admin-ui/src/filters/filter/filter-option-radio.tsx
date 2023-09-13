import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { ComboboxItem } from 'ariakit/combobox'

import { FilterRadio } from './filter-radio'
import { usePopoverContext } from '../filter-popover-context'
import { filterControlInputTheme } from '../filter.style'
import { cx } from '@vtex/admin-ui-core'

export const FilterOptionRadio = forwardRef(function FilterOptionRadio(
  props: FilterOptionRadioProps,
  ref: Ref<HTMLDivElement>
) {
  const { id, label, value, className = '', onClick, ...htmlProps } = props

  const { state } = usePopoverContext()

  const { selectedItem, setSelectedItem } = state.combobox

  const isSelected = selectedItem?.id === id || false

  const item = { id, label, value }

  return (
    <ComboboxItem
      ref={ref}
      className={cx(filterControlInputTheme, className)}
      id={id}
      onClick={(e) => {
        setSelectedItem(item)
        onClick?.(e)
      }}
      aria-selected={isSelected}
      {...htmlProps}
    >
      <FilterRadio checked={isSelected} />
      {label}
    </ComboboxItem>
  )
})

interface FilterOptionRadioProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'id'> {
  id: string
  label: string
  value?: any
}
