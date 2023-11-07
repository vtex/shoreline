import React, { forwardRef } from 'react'

import type { SelectListProps } from '../select'
import { SelectList } from '../select'

export const FilterList = forwardRef<HTMLDivElement, FilterListProps>(
  function FilterList(props, ref) {
    const { ...otherProps } = props

    return (
      <SelectList alwaysVisible data-sl-filter-list ref={ref} {...otherProps} />
    )
  }
)

export type FilterListProps = Omit<SelectListProps, 'alwaysVisible'>
