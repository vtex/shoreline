import React, { forwardRef } from 'react'
import type { SelectOptionProps } from '../select'
import { SelectOption, SelectOptionCheck } from '../select'
import { useComboboxContext } from '@ariakit/react'
import { ComboboxItem } from '../combobox'

export const FilterOption = forwardRef<HTMLDivElement, FilterOptionProps>(
  function FilterOption(props, ref) {
    const { asChild = false, children, ...otherProps } = props
    const { searchable } = useFilterOption()

    return searchable ? (
      <SelectOption
        hideOnClick={false}
        data-sl-filter-option
        ref={ref}
        {...otherProps}
        asChild
      >
        <ComboboxItem asChild={asChild}>
          {children} <SelectOptionCheck />
        </ComboboxItem>
      </SelectOption>
    ) : (
      <SelectOption
        hideOnClick={false}
        data-sl-filter-option
        ref={ref}
        asChild={asChild}
        {...otherProps}
      >
        {children}
      </SelectOption>
    )
  }
)

function useFilterOption() {
  const combobox = useComboboxContext()

  return {
    searchable: !!combobox,
  }
}

export type FilterOptionProps = Omit<SelectOptionProps, 'hideOnClick'>
