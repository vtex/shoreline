import React, { forwardRef } from 'react'

import type { SelectItemProps } from '@vtex/shoreline-primitives'
import { SelectItem, ComboboxItem } from '@vtex/shoreline-primitives'
import { useSearchable } from './use-searchable'
import { FilterOptionCheck } from './filter-option-check'

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
      <SelectItem
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
      </SelectItem>
    ) : (
      <SelectItem
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
      </SelectItem>
    )
  }
)

export type FilterOptionProps = Omit<SelectItemProps, 'hideOnClick'>
