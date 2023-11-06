import React, { forwardRef } from 'react'
import { PopoverDismiss } from '../popover'
import { Button } from '../button'
import { useFilterContext } from './filter-context'
import { isString } from '@vtex/shoreline-utils'

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

export function FilterApply() {
  const context = useFilterContext()

  if (!context) {
    return null
  }

  const { select, filter } = context

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
  const context = useFilterContext()

  if (!context) {
    return null
  }

  const { filter, select } = context

  const clear = () => {
    filter?.setValue([])
    select?.setValue([])
  }

  return (
    <PopoverDismiss asChild>
      <Button onClick={clear}>Clear</Button>
    </PopoverDismiss>
  )
}

export function FilterValue() {
  const context = useFilterContext()

  if (!context) {
    return null
  }

  const { filter } = context

  const value = filter?.useState('value')

  return (
    <span>
      {Array.isArray(value) ? (
        value.map((v: any) => <span key={v}>{v}</span>)
      ) : (
        <span>{value}</span>
      )}
    </span>
  )
}

function shallowEqual<T>(
  a: T[] | T,
  b: T[] | T,
  equals = (a: T, b: T) => a === b
): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length && a.every((val, index) => equals(val, b[index]))
    )
  }

  if (isString(a) && isString(b)) {
    return equals(a, b)
  }

  return false
}
