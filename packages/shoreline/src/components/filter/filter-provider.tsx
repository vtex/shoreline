import type { Dispatch, ReactNode } from 'react'
import { useEffect } from 'react'
import { ComboboxProvider } from '../combobox'

import { PopoverProvider, usePopoverStore } from '../popover'
import { SelectProvider, useSelectStore } from '../select'
import { FilterContext } from './filter-context'

/**
 * Provides context to Filter
 * @example
 * <FilterProvider>
 *   <FilterTrigger>...</FilterTrigger>
 *   <FilterPopover>...</FilterPopover>
 * </FilterProvider>
 */
export function FilterProvider<Value extends string | string[] = string>(
  props: FilterProviderProps<Value>
) {
  const {
    children,
    open,
    setOpen,
    defaultOpen,
    value,
    setValue,
    defaultValue,
    searchValue,
    setSearchValue,
    defaultSearchValue,
  } = props

  const popoverStore = usePopoverStore({
    open,
    setOpen,
    defaultOpen,
  })

  const filterStore = useSelectStore({
    value,
    setValue: setValue as any,
    defaultValue,
  })

  const selectStore = useSelectStore({
    defaultValue,
  })

  useEffect(function syncState() {
    selectStore.setValue(filterStore.getState().value)
  }, [])

  const searchable = !!searchValue || !!setSearchValue || !!defaultSearchValue

  return searchable ? (
    <ComboboxProvider
      resetValueOnHide
      value={searchValue}
      setValue={setSearchValue}
      defaultValue={defaultSearchValue}
    >
      <PopoverProvider store={popoverStore}>
        <SelectProvider store={selectStore}>
          <FilterContext.Provider value={filterStore}>
            {children}
          </FilterContext.Provider>
        </SelectProvider>
      </PopoverProvider>
    </ComboboxProvider>
  ) : (
    <PopoverProvider store={popoverStore}>
      <SelectProvider store={selectStore}>
        <FilterContext.Provider value={filterStore}>
          {children}
        </FilterContext.Provider>
      </SelectProvider>
    </PopoverProvider>
  )
}

export interface FilterProviderOptions<
  Value extends string | string[] = string,
> {
  /**
   * Children of FilterProvider
   */
  children: ReactNode
  /**
   * Whether the filter is open
   */
  open?: boolean
  /**
   * Callback to set the filter open state
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  /**
   * Whether the filter is open by default
   */
  defaultOpen?: boolean
  /**
   * Whether the filter is searchable
   */
  searchValue?: string
  /**
   * Callback to set the filter search value
   */
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>
  /**
   * Whether the filter is searchable by default
   */
  defaultSearchValue?: string
  /**
   * Filter value
   */
  value?: Value
  /**
   * Callback to set the filter value
   */
  setValue?: Dispatch<Value>
  /**
   * Filter default value
   */
  defaultValue?: Value
}

export type FilterProviderProps<Value extends string | string[] = string> =
  FilterProviderOptions<Value>
