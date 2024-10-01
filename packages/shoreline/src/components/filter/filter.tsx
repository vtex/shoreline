import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { FilterList } from './filter-list'
import type { FilterPopoverProps } from './filter-popover'
import { FilterPopover } from './filter-popover'
import type { FilterProviderProps } from './filter-provider'
import { FilterProvider } from './filter-provider'
import { FilterTrigger, type FilterTriggerProps } from './filter-trigger'

/**
 * Filters represent criteria that users can choose to narrow down a Collection. They can include single or multiple selection.
 * @status stable
 * @example
 * <Filter label="Label">
 *  <FilterItem value="option">Option</FilterItem>
 * </Filter>
 */
export const Filter = forwardRef<HTMLDivElement, FilterProps>(
  function Filter(props, ref) {
    const {
      children,
      label,
      value,
      setValue,
      defaultValue,
      searchValue,
      setSearchValue,
      defaultSearchValue,
      messages,
      disabled,
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
          <FilterTrigger disabled={disabled}>{label}</FilterTrigger>
          <FilterPopover messages={messages}>
            <FilterList>{children}</FilterList>
          </FilterPopover>
        </FilterProvider>
      </div>
    )
  }
)

type InheritedOptions = Pick<
  FilterProviderProps,
  | 'value'
  | 'setValue'
  | 'defaultValue'
  | 'searchValue'
  | 'setSearchValue'
  | 'defaultSearchValue'
> &
  Pick<FilterPopoverProps, 'messages'> &
  Pick<FilterTriggerProps, 'disabled'>

export interface FilterOptions extends InheritedOptions {
  /**
   * Filter label
   */
  label: string
}

export type FilterProps = FilterOptions & ComponentPropsWithoutRef<'div'>
