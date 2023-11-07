import React, { forwardRef } from 'react'

import type { SelectListProps } from '../select'
import { SelectList } from '../select'
import { ComboboxList } from '../combobox'
import { useSearchable } from './use-searchable'

export const FilterList = forwardRef<HTMLDivElement, FilterListProps>(
  function FilterList(props, ref) {
    const searchable = useSearchable()

    const Comp = searchable ? ComboboxList : SelectList

    return (
      <Comp
        alwaysVisible
        data-sl-filter-list
        ref={ref}
        data-searchable={searchable}
        {...props}
      />
    )
  }
)

export type FilterListProps = Omit<SelectListProps, 'alwaysVisible'>
