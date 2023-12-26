import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { IconCheckSmall } from '@vtex/shoreline-icons'

import { useSelectContext } from '@vtex/shoreline-primitives'
import { SelectItemCheck } from '@ariakit/react'
import './filter-option-check.css'

/**
 * Check state of the FilterOption
 */
export const FilterOptionCheck = forwardRef<
  HTMLDivElement,
  FilterOptionCheckProps
>(function FilterOptionCheck(props, ref) {
  const select = useSelectContext()
  const multiselect = Array.isArray(select?.getState().value)

  return (
    <span
      aria-hidden="true"
      data-sl-filter-option-check
      data-multiselect={multiselect}
      ref={ref}
      {...props}
    >
      <SelectItemCheck>
        <span
          data-sl-filter-option-check-indicator
          data-multiselect={multiselect}
        >
          {multiselect ? (
            <IconCheckSmall />
          ) : (
            <span data-sl-filter-option-check-radio-center />
          )}
        </span>
      </SelectItemCheck>
    </span>
  )
})

export type FilterOptionCheckProps = ComponentPropsWithoutRef<'div'>
