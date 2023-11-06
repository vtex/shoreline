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
