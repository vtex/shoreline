import type { ComponentPropsWithoutRef, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { FilterList } from './filter-list'
import type { FilterPopoverProps } from './filter-popover'
import { FilterPopover } from './filter-popover'
import type { FilterProviderProps } from './filter-provider'
import { FilterProvider } from './filter-provider'
import { FilterTrigger, type FilterTriggerProps } from './filter-trigger'

const FilterComp = <Value extends string | string[] = string>(
  props: FilterProps<Value>,
  ref: ForwardedRef<HTMLDivElement>
) => {
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

/**
 * Filters represent criteria that users can choose to narrow down a Collection. They can include single or multiple selection.
 * @status stable
 * @example
 * <Filter label="Label">
 *  <FilterItem value="option">Option</FilterItem>
 * </Filter>
 */
export const Filter = forwardRef(FilterComp) as <
  Value extends string | string[] = string,
>(
  props: FilterProps<Value>,
  ref: ForwardedRef<HTMLDivElement>
) => JSX.Element

type InheritedOptions<Value extends string | string[] = string> = Pick<
  FilterProviderProps<Value>,
  | 'value'
  | 'setValue'
  | 'defaultValue'
  | 'searchValue'
  | 'setSearchValue'
  | 'defaultSearchValue'
> &
  Pick<FilterPopoverProps, 'messages'> &
  Pick<FilterTriggerProps, 'disabled'>

export interface FilterOptions<Value extends string | string[] = string>
  extends InheritedOptions<Value> {
  /**
   * Filter label
   */
  label: string
}

export type FilterProps<Value extends string | string[] = string> =
  FilterOptions<Value> & ComponentPropsWithoutRef<'div'>
