import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { SearchProps } from '../search'
import { Search } from '../search'
import { usePopoverContext } from './filter-popover-context'
import { filterSearchboxTheme } from './filter.css'
import { cx } from '@vtex/admin-ui-core'

export const FilterSearchbox = forwardRef(function FilterSearchbox(
  props: FilterSearchboxProps,
  ref: Ref<HTMLFormElement>
) {
  const { id, className = '', ...htmlProps } = props
  const {
    state: { combobox },
  } = usePopoverContext()

  const { setValue, value } = combobox

  return (
    <Search
      ref={ref}
      id={id}
      value={value}
      onClear={() => setValue('')}
      onChange={(e) => setValue(e.target.value)}
      className={cx(filterSearchboxTheme, className)}
      {...htmlProps}
    />
  )
})

export type FilterSearchboxProps = SearchProps
