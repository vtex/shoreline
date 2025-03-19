import { forwardRef } from 'react'
import { useFilterContext } from './filter-context'
import type { PopoverDismissProps } from '../popover'
import { PopoverDismiss } from '../popover'
import { mergeProps } from '@vtex/shoreline-utils'
import type { PopoverDismissOptions } from '@ariakit/react'
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

  const isSelectValueEmpty = Array.isArray(selectValue)
    ? selectValue.length === 0
    : !selectValue
  const isFilterValueEmpty = Array.isArray(filterValue)
    ? filterValue.length === 0
    : !filterValue

  return {
    onClick() {
      filter?.setValue(reset)
      select?.setValue(reset)
    },
    disabled: isSelectValueEmpty && isFilterValueEmpty,
  }
}

function reset(value: string | string[]): string[] | string {
  return Array.isArray(value) ? [] : ''
}

export type FilterClearOptions = PopoverDismissOptions
export type FilterClearProps = PopoverDismissProps
