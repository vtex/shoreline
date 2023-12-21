import React, { forwardRef } from 'react'
import { useFilterContext } from './filter-context'
import type { PopoverDismissProps } from '../popover'
import { PopoverDismiss } from '../popover'
import { mergeProps } from '@vtex/shoreline-utils'
import { useSelectContext } from '@ariakit/react'

/**
 * Action that clears both Filter value and UI Select value
 * @example
 * <FilterClear>Clear</FilterClear>
 */
export const FilterClear = forwardRef<HTMLButtonElement, PopoverDismissProps>(
  function FilterClear(props, ref) {
    const clearProps = useFilterClear()

    return <PopoverDismiss ref={ref} {...mergeProps(props, clearProps)} />
  }
)

function useFilterClear() {
  const select = useSelectContext()
  const filter = useFilterContext()

  const selectValue = select?.useState('value') ?? ''
  const filterValue = filter?.useState('value') ?? ''

  return {
    onClick() {
      filter?.setValue(reset)
      select?.setValue(reset)
    },
    disabled: !selectValue && !filterValue,
  }
}

function reset(value: string | string[]): string[] | string {
  return Array.isArray(value) ? [] : ''
}

export type FilterClearProps = PopoverDismissProps
