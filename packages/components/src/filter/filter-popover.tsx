import React, { forwardRef } from 'react'
import type { PopoverProps } from '../popover'
import { Popover } from '../popover'

export const FilterPopover = forwardRef<HTMLDivElement, FilterPopoverProps>(
  function FilterPopover(props, ref) {
    const { ...otherProps } = props

    return <Popover data-sl-filter-popover ref={ref} {...otherProps} />
  }
)

export type FilterPopoverProps = PopoverProps
