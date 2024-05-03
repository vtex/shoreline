import { forwardRef } from 'react'

import { SelectItem } from '../select'
import type { SelectItemOptions, SelectItemProps } from '../select'
import { ComboboxItem } from '../combobox'
import { useSearchable } from './use-searchable'
import { FilterItemCheck } from './filter-item-check'

/**
 * Filter Option
 * @example
 * <Filter label="Label">
 *  <FilterItem value="option">Option</FilterItem>
 * </Filter>
 */
export const FilterItem = forwardRef<HTMLDivElement, FilterItemProps>(
  function FilterItem(props, ref) {
    const { asChild = false, children, ...otherProps } = props
    const searchable = useSearchable()

    return searchable ? (
      <SelectItem
        hideOnClick={false}
        data-sl-filter-item
        ref={ref}
        {...otherProps}
        asChild
      >
        <ComboboxItem asChild={asChild}>
          <FilterItemCheck />
          <span>{children}</span>
        </ComboboxItem>
      </SelectItem>
    ) : (
      <SelectItem
        hideOnClick={false}
        data-sl-filter-item
        ref={ref}
        asChild
        {...otherProps}
      >
        <span>
          <FilterItemCheck />
          <span>{children}</span>
        </span>
      </SelectItem>
    )
  }
)

export type FilterItemOptions = Omit<SelectItemOptions, 'hideOnClick'>
export type FilterItemProps = Omit<SelectItemProps, 'hideOnClick'>
