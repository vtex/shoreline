import { forwardRef } from 'react'
import { SelectList } from '../select'
import type { SelectListOptions, SelectListProps } from '../select'
import { ComboboxList } from '../combobox'
import { useSearchable } from './use-searchable'

/**
 * Filter listbox
 * @example
 * <FilterProvider>
 *  <FilterPopover>
 *    <FilterList>
 *      <FilterItem value="option">Option</FilterItem>
 *    </FilterList>
 *  </FilterPopover>
 * </FilterProvider>
 */
export const FilterList = forwardRef<HTMLDivElement, FilterListProps>(
  function FilterList(props, ref) {
    const searchable = useSearchable()

    const Comp = searchable ? ComboboxList : SelectList

    return (
      <Comp
        alwaysVisible
        data-sl-filter-list
        ref={ref}
        data-searchable={searchable}
        {...props}
      />
    )
  }
)

export type FilterListOptions = Omit<SelectListOptions, 'alwaysVisible'>
export type FilterListProps = Omit<SelectListProps, 'alwaysVisible'>
