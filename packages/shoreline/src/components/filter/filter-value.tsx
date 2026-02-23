import { useSelectContext } from '@ariakit/react'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useCallback } from 'react'
import { useFilterContext } from './filter-context'

const valueSeparator = ': '
const countPrefix = ', +'

/**
 * Renders the Filter applied value
 */
export const FilterValue = forwardRef<HTMLSpanElement, FilterValueProps>(
  function FilterValue(props, ref) {
    const filter = useFilterContext()
    const value = filter?.useState('value')

    const valueIsArray = Array.isArray(value)
    const valueIsMultiSelected = valueIsArray && value.length > 1

    const selectContext = useSelectContext()
    const items = selectContext?.useState('items')

    const getValueText = useCallback(
      () =>
        items?.find((item) =>
          valueIsArray ? item.value === value[0] : item.value === value
        )?.element?.innerText,
      [value, valueIsArray, items]
    )

    return (
      <span data-sl-filter-value ref={ref} {...props}>
        {value && value.length > 0 && valueSeparator}
        {getValueText()}
        {valueIsMultiSelected && `${countPrefix}${value.length - 1}`}
      </span>
    )
  }
)

export interface FilterValueOptions {
  /**
   * Custom styles
   */
  className?: string
}

export type FilterValueProps = FilterValueOptions &
  ComponentPropsWithoutRef<'span'>
