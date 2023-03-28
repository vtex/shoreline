import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { ComboboxItem } from 'ariakit/combobox'
import { Checkbox } from '../../checkbox'

import { createComponent, useElement } from '@vtex/admin-ui-react'
import { usePopoverContext } from '../filter-popover-context'
import type { ComboboxMultipleState } from '../../combobox'
import type { FilterOption } from '../filter/filter.state'
import {
  filterControlInputTheme,
  filterControlOptionTheme,
} from '../filter.css'
import { cx } from '@vtex/admin-ui-core'

export const FilterOptionCheckbox = forwardRef(function FilterOptionCheckbox(
  props: FilterOptionCheckboxProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    id,
    value,
    label,
    className = '',
    onClick,
    children,
    ...htmlProps
  } = props

  const { state } = usePopoverContext()

  const item = { id, label, value }

  const combobox = state.combobox as ComboboxMultipleState<FilterOption<any>>

  return (
    <ComboboxItem
      ref={ref}
      className={cx(filterControlInputTheme, className)}
      onClick={(e) => {
        combobox.onChange(item)
        onClick?.(e)
      }}
      id={id}
      aria-selected={combobox.isSelected(item)}
      {...htmlProps}
    >
      {children || (
        <>
          <Checkbox
            checked={combobox.isSelected(item)}
            aria-checked={undefined}
            readOnly
          />
          {label}
        </>
      )}
    </ComboboxItem>
  )
})

export const _FilterOptionCheckbox = createComponent<
  typeof ComboboxItem,
  FilterOptionCheckboxProps
>((props) => {
  const { id, value, label, ...restProps } = props
  const { state } = usePopoverContext()

  const item = { id, label, value }

  const combobox = state.combobox as ComboboxMultipleState<FilterOption<any>>

  return useElement(ComboboxItem, {
    className: filterControlOptionTheme,
    children: (
      <>
        <Checkbox
          checked={combobox.isSelected(item)}
          aria-checked={undefined}
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

interface FilterOptionCheckboxProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'id'> {
  id: string
  label: string
  value?: any
}
