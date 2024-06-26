import { forwardRef } from 'react'
import { mergeProps } from '@vtex/shoreline-utils'

import type { PopoverDismissProps } from '../popover'
import { PopoverDismiss } from '../popover'
import { useFilterContext } from './filter-context'
import { shallowEqual } from './shallow-equal'
import type { PopoverDismissOptions } from '@ariakit/react'
import { useSelectContext } from '@ariakit/react'

/**
 * Action that applies the Filter value, and closes the popover
 * @example
 * <FilterApply>Apply</FilterApply>
 */
export const FilterApply = forwardRef<HTMLButtonElement, FilterApplyProps>(
  function FilterApply(props, ref) {
    const applyProps = useFilterApply()

    return <PopoverDismiss ref={ref} {...mergeProps(props, applyProps)} />
  }
)

function useFilterApply() {
  const select = useSelectContext()
  const filter = useFilterContext()

  const selectValue = select?.useState('value') ?? ''
  const filterValue = filter?.useState('value') ?? ''

  return {
    onClick() {
      filter?.setValue(selectValue)
    },
    disabled: shallowEqual(selectValue, filterValue),
  }
}

export type FilterApplyOptions = PopoverDismissOptions
export type FilterApplyProps = PopoverDismissProps
