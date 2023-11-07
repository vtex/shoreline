import React, { forwardRef } from 'react'
import type { SelectOptionProps } from '../select'
import { SelectOption } from '../select'

export const FilterOption = forwardRef<HTMLDivElement, FilterOptionProps>(
  function FilterOption(props, ref) {
    const { ...otherProps } = props

    return (
      <SelectOption
        hideOnClick={false}
        data-sl-filter-option
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export type FilterOptionProps = Omit<SelectOptionProps, 'hideOnClick'>
