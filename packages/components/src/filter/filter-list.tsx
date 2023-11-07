import React, { forwardRef } from 'react'

import type { SelectListProps } from '../select'
import { SelectList } from '../select'
import { ComboboxList } from '../combobox'
import { useComboboxContext } from '@ariakit/react'

export const FilterList = forwardRef<HTMLDivElement, FilterListProps>(
  function FilterList(props, ref) {
    const { searchable } = useFilterList()

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

function useFilterList() {
  const combobox = useComboboxContext()

  return {
    searchable: !!combobox,
  }
}

export type FilterListProps = Omit<SelectListProps, 'alwaysVisible'>
