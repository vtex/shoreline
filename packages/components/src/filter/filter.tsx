import React, { forwardRef } from 'react'
import { useFilterContext } from './filter-context'

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

export function FilterValue() {
  const context = useFilterContext()

  if (!context) {
    return null
  }

  const { filter } = context

  const value = filter?.useState('value')

  const isLongArray = Array.isArray(value) && value.length > 1

  return (
    <span>
      {value && value.length > 0 && ': '}
      {isLongArray ? value[0] : value}
      {isLongArray && `, +${value.length - 1}`}
    </span>
  )
}
