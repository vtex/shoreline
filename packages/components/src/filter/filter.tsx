import type { ReactNode } from 'react'
import React, { forwardRef, useContext, createContext } from 'react'
import { PopoverProvider, PopoverDismiss } from '../popover'
import { Button } from '../button'
import {
  usePopoverStore,
  useSelectContext,
  useSelectStore,
} from '@ariakit/react'
import { SelectProvider } from '../select'

export const Filter = forwardRef<HTMLDivElement, FilterProps>(function Filter(
  props,
  ref
) {
  const { ...otherProps } = props

  return (
    <div data-sl-filter ref={ref} {...otherProps}>
      Filter
    </div>
  )
})

export interface FilterProps {
  className?: string
}

interface FilterProviderProps {
  children: ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  defaultOpen?: boolean
  // select?: any
  // setSelect?: React.Dispatch<React.SetStateAction<any>>
  // defaultSelect?: any
}

const FilterContext = createContext<any>(null)

export function FilterProvider(props: FilterProviderProps) {
  const {
    children,
    open,
    setOpen,
    defaultOpen,
    // select,
    // setSelect,
    // defaultSelect,
  } = props

  const popover = usePopoverStore({
    open,
    setOpen,
    defaultOpen,
  })

  const select = useSelectStore({
    defaultValue: [],
  })

  const filter = useSelectStore({
    defaultValue: [],
  })

  return (
    <PopoverProvider store={popover}>
      <SelectProvider store={select}>
        <FilterContext.Provider value={filter}>
          {children}
        </FilterContext.Provider>
      </SelectProvider>
    </PopoverProvider>
  )
}

export function FilterApply() {
  const filter = useContext(FilterContext)
  const select = useSelectContext()

  if (!filter || !select) {
    return null
  }

  const selectValue = select.useState('value')
  const appliedValue = filter.useState('value')

  const apply = () => {
    filter.setValue(selectValue)
  }

  const canApply = shallowEqual(selectValue, appliedValue)

  return (
    <PopoverDismiss asChild>
      <Button onClick={apply} variant="primary" disabled={canApply}>
        Apply
      </Button>
    </PopoverDismiss>
  )
}

export function FilterClear() {
  const filter = useContext(FilterContext)
  const select = useSelectContext()

  if (!filter || !select) {
    return null
  }

  const clear = () => {
    filter.setValue([])
    select.setValue([])
  }

  return (
    <PopoverDismiss asChild>
      <Button onClick={clear}>Clear</Button>
    </PopoverDismiss>
  )
}

export function FilterValue() {
  const filter = useContext(FilterContext)

  if (!filter) {
    return null
  }

  const value = filter.useState('value')

  return (
    <span>
      {value.map((v: any) => (
        <span key={v}>{v}</span>
      ))}
    </span>
  )
}

function shallowEqual(a: any[] | string, b: any[] | string): boolean {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}
