import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { ComboboxItem } from 'ariakit/combobox'
import { Checkbox } from '../../checkbox'
import { usePopoverContext } from '../filter-popover-context'
import type { ComboboxMultipleState } from '../../combobox'
import type { FilterOption } from '../filter/filter.state'
import { filterControlInputTheme } from '../filter.style'

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

interface FilterOptionCheckboxProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'id'> {
  id: string
  label: string
  value?: any
}
