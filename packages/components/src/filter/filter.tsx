import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { FilterProviderProps } from './filter-provider'
import { FilterProvider } from './filter-provider'
import { FilterTrigger } from './filter-trigger'
import { FilterPopover } from './filter-popover'
import { FilterList } from './filter-list'

/**
 * Filter component
 * @example
 * <Filter label="Label">
 *  <FilterOption value="option">Option</FilterOption>
 * </Filter>
 */
export const Filter = forwardRef<HTMLDivElement, FilterProps>(function Filter(
  props,
  ref
) {
  const {
    children,
    label,
    value,
    setValue,
    defaultValue,
    searchValue,
    setSearchValue,
    defaultSearchValue,
    ...otherProps
  } = props

  return (
    <div data-sl-filter ref={ref} {...otherProps}>
      <FilterProvider
        value={value}
        setValue={setValue}
        defaultValue={defaultValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        defaultSearchValue={defaultSearchValue}
      >
        <FilterTrigger>{label}</FilterTrigger>
        <FilterPopover>
          <FilterList>{children}</FilterList>
        </FilterPopover>
      </FilterProvider>
    </div>
  )
})

type InheritedProps = Pick<
  FilterProviderProps,
  | 'value'
  | 'setValue'
  | 'defaultValue'
  | 'searchValue'
  | 'setSearchValue'
  | 'defaultSearchValue'
>

export interface FilterProps extends InheritedProps {
  label: string
  children: ReactNode
  className?: string
}
