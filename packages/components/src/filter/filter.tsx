import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { FilterProviderProps } from './filter-provider'
import { FilterProvider } from './filter-provider'
import { FilterTrigger } from './filter-trigger'
import { FilterPopover } from './filter-popover'
import { FilterList } from './filter-list'

export const Filter = forwardRef<HTMLDivElement, FilterProps>(function Filter(
  props,
  ref
) {
  const { children, label, value, setValue, defaultValue, ...otherProps } =
    props

  return (
    <div data-sl-filter ref={ref} {...otherProps}>
      <FilterProvider
        value={value}
        setValue={setValue}
        defaultValue={defaultValue}
      >
        <FilterTrigger>{label}</FilterTrigger>
        <FilterPopover>
          <FilterList>{children}</FilterList>
        </FilterPopover>
      </FilterProvider>
    </div>
  )
})

export interface FilterProps {
  label: string
  children: ReactNode
  className?: string
  value?: FilterProviderProps['value']
  setValue?: FilterProviderProps['setValue']
  defaultValue?: FilterProviderProps['defaultValue']
}
