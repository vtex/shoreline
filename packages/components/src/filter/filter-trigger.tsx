import React, { forwardRef } from 'react'
import { FilterValue } from './filter-value'
import type { PopoverTriggerProps } from '../popover'
import { PopoverTrigger } from '../popover'
import { Button } from '../button'

/**
 * Triggers the Filter Popover box, also displays the Filter applied value
 * @example
 * <FilterProvider>
 *   <FilterTrigger>Open</FilterTrigger>
 * </FilterProvider>
 */
export const FilterTrigger = forwardRef<HTMLButtonElement, FilterTriggerProps>(
  function FilterTrigger(props, ref) {
    const { children, ...otherProps } = props

    return (
      <PopoverTrigger data-sl-filter ref={ref} {...otherProps} asChild>
        <Button>
          {children}
          <FilterValue />
        </Button>
      </PopoverTrigger>
    )
  }
)

export type FilterTriggerProps = PopoverTriggerProps
