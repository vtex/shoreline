import React from 'react'
import type { PopoverDismissProps } from '../popover'
import { PopoverDismiss } from '../popover'
import { useFilterContext } from './filter-context'
import { shallowEqual } from './shallow-equal'

export function FilterApply(props: PopoverDismissProps) {
  const { select, filter } = useFilterContext()

  const selectValue = select?.useState('value') ?? ''
  const filterValue = filter?.useState('value') ?? ''

  const apply = () => {
    filter?.setValue(selectValue)
  }

  const disabled = shallowEqual(selectValue, filterValue)

  return <PopoverDismiss onClick={apply} disabled={disabled} {...props} />
}
