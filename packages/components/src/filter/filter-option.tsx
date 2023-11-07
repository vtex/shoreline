import React, { forwardRef } from 'react'

import type { SelectOptionProps } from '../select'
import { SelectOption, SelectOptionCheck } from '../select'
import { ComboboxItem } from '../combobox'
import { useSearchable } from './use-searchable'

export const FilterOption = forwardRef<HTMLDivElement, FilterOptionProps>(
  function FilterOption(props, ref) {
    const { asChild = false, children, ...otherProps } = props
    const searchable = useSearchable()

    return searchable ? (
      <SelectOption
        hideOnClick={false}
        data-sl-filter-option
        ref={ref}
        {...otherProps}
        asChild
      >
        <ComboboxItem asChild={asChild}>
          {children} <SelectOptionCheck />
        </ComboboxItem>
      </SelectOption>
    ) : (
      <SelectOption
        hideOnClick={false}
        data-sl-filter-option
        ref={ref}
        asChild={asChild}
        {...otherProps}
      >
        {children}
      </SelectOption>
    )
  }
)

export type FilterOptionProps = Omit<SelectOptionProps, 'hideOnClick'>
