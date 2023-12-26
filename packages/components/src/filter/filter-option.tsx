import React, { forwardRef } from 'react'

import type { SelectOptionProps } from '@vtex/shoreline-primitives'
import { SelectOption, ComboboxItem } from '@vtex/shoreline-primitives'
import { useSearchable } from './use-searchable'
import { FilterOptionCheck } from './filter-option-check'

import './filter-option.css'

/**
 * Filter Option
 * @example
 * <Filter label="Label">
 *  <FilterOption value="option">Option</FilterOption>
 * </Filter>
 */
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
          <FilterOptionCheck />
          <span>{children}</span>
        </ComboboxItem>
      </SelectOption>
    ) : (
      <SelectOption
        hideOnClick={false}
        data-sl-filter-option
        ref={ref}
        asChild
        {...otherProps}
      >
        <span>
          <FilterOptionCheck />
          <span>{children}</span>
        </span>
      </SelectOption>
    )
  }
)

export type FilterOptionProps = Omit<SelectOptionProps, 'hideOnClick'>
