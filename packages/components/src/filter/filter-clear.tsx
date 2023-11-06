import React from 'react'
import { useFilterContext } from './filter-context'
import type { PopoverDismissProps } from '../popover'
import { PopoverDismiss } from '../popover'

export function FilterClear(props: PopoverDismissProps) {
  const { filter, select } = useFilterContext()

  const clear = () => {
    filter?.setValue([])
    select?.setValue([])
  }

  return <PopoverDismiss onClick={clear} {...props} />
}
