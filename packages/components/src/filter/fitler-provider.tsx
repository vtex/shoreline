import React from 'react'
import type { ReactNode } from 'react'

import { PopoverProvider, usePopoverStore } from '../popover'
import { SelectProvider, useSelectStore } from '../select'
import { FilterContext } from './filter-context'

interface FilterProviderProps {
  children: ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  defaultOpen?: boolean
  select?: string | string[]
  setSelect?: React.Dispatch<React.SetStateAction<string | string[]>>
  defaultSelect?: string | string[]
  filter?: string | string[]
  setFilter?: React.Dispatch<React.SetStateAction<string | string[]>>
  defaultFilter?: string | string[]
}

export function FilterProvider(props: FilterProviderProps) {
  const {
    children,
    open,
    setOpen,
    defaultOpen,
    select,
    setSelect,
    defaultSelect,
    filter,
    setFilter,
    defaultFilter,
  } = props

  const popoverStore = usePopoverStore({
    open,
    setOpen,
    defaultOpen,
  })

  const selectStore = useSelectStore({
    value: select,
    setValue: setSelect,
    defaultValue: defaultSelect,
  })

  const filterStore = useSelectStore({
    value: filter,
    setValue: setFilter,
    defaultValue: defaultFilter,
  })

  return (
    <PopoverProvider store={popoverStore}>
      <SelectProvider store={selectStore}>
        <FilterContext.Provider value={filterStore}>
          {children}
        </FilterContext.Provider>
      </SelectProvider>
    </PopoverProvider>
  )
}
