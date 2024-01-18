import React, { useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  SelectProvider,
  useSelectStore,
  ComboboxProvider,
} from '@vtex/shoreline-primitives'

import { PopoverProvider, usePopoverStore } from '../popover'
import { FilterContext } from './filter-context'

/**
 * Provides context to Filter
 * @example
 * <FilterProvider>
 *   <FilterTrigger>...</FilterTrigger>
 *   <FilterPopover>...</FilterPopover>
 * </FilterProvider>
 */
export function FilterProvider(props: FilterProviderProps) {
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

export interface FilterProviderProps {
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
  value?: string | string[]
  /**
   * Callback to set the filter value
   */
  setValue?:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>
  /**
   * Filter default value
   */
  defaultValue?: string | string[]
}
