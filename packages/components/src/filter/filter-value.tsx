import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { useFilterContext } from './filter-context'

const valueSeparator = ': '
const countPrefix = ', +'

export const FilterValue = forwardRef<HTMLSpanElement, FilterValueProps>(
  function FilterValue(props, ref) {
    const filter = useFilterContext()
    const value = filter?.useState('value')

    const isArray = Array.isArray(value)
    const isLongArray = isArray && value.length > 1

    return (
      <span data-sl-filter-value ref={ref} {...props}>
        {value && value.length > 0 && valueSeparator}
        {isArray ? value[0] : value}
        {isLongArray && `${countPrefix}${value.length - 1}`}
      </span>
    )
  }
)

export type FilterValueProps = ComponentPropsWithoutRef<'span'>
