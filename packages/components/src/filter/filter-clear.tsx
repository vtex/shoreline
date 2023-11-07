import React, { forwardRef } from 'react'
import { useFilterContext } from './filter-context'
import type { PopoverDismissProps } from '../popover'
import { PopoverDismiss } from '../popover'
import { mergeProps } from '@vtex/shoreline-utils'
import { useSelectContext } from '@ariakit/react'

export const FilterClear = forwardRef<HTMLButtonElement, PopoverDismissProps>(
  function FilterClear(props, ref) {
    const clearProps = useFilterClear()

    return <PopoverDismiss ref={ref} {...mergeProps(props, clearProps)} />
  }
)

function useFilterClear() {
  const select = useSelectContext()
  const filter = useFilterContext()

  return {
    onClick() {
      filter?.setValue(reset)
      select?.setValue(reset)
    },
  }
}

function reset(value: string | string[]): string[] | string {
  return Array.isArray(value) ? [] : ''
}

export type FilterClearProps = PopoverDismissProps
