import React, { forwardRef } from 'react'
import { mergeProps } from '@vtex/shoreline-utils'

import type { PopoverDismissProps } from '../popover'
import { PopoverDismiss } from '../popover'
import { useFilterContext } from './filter-context'
import { shallowEqual } from './shallow-equal'

export const FilterApply = forwardRef<HTMLButtonElement, FilterApplyProps>(
  function FilterApply(props, ref) {
    const applyProps = useFilterApply()

    return <PopoverDismiss ref={ref} {...mergeProps(props, applyProps)} />
  }
)

function useFilterApply() {
  const { select, filter } = useFilterContext()

  const selectValue = select?.useState('value') ?? ''
  const filterValue = filter?.useState('value') ?? ''

  return {
    onClick() {
      filter?.setValue(selectValue)
    },
    disabled: shallowEqual(selectValue, filterValue),
  }
}

export type FilterApplyProps = PopoverDismissProps
