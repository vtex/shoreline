import React from 'react'
import { useFilterContext } from './filter-context'
import type { PopoverDismissProps } from '../popover'
import { PopoverDismiss } from '../popover'

export function FilterClear(props: PopoverDismissProps) {
  const { filter, select } = useFilterContext()

  const clear = () => {
    filter?.setValue(reset)
    select?.setValue(reset)
  }

  return <PopoverDismiss onClick={clear} {...props} />
}

function reset(value: string | string[]): string[] | string {
  return Array.isArray(value) ? [] : ''
}
