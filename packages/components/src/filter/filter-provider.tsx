import React, { useEffect } from 'react'
import type { ReactNode } from 'react'

import { PopoverProvider, usePopoverStore } from '../popover'
import { SelectProvider, useSelectStore } from '../select'
import { FilterContext } from './filter-context'

export function FilterProvider(props: FilterProviderProps) {
  const {
    children,
    open,
    setOpen,
    defaultOpen,
    value,
    setValue,
    defaultValue,
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

export interface FilterProviderProps {
  children: ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  defaultOpen?: boolean
  value?: string | string[]
  setValue?:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>
  defaultValue?: string | string[]
}
