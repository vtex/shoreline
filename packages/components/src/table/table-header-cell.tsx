import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '@vtex/shoreline-primitives'

export const TableHeaderCell = forwardRef<HTMLDivElement, TableHeaderCellProps>(
  function TableHeaderCell(props, ref) {
    const {
      asChild = false,
      sortable = false,
      align = 'start',
      ...otherProps
    } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        role="columnheader"
        data-sl-table-header-cell
        data-sortable={sortable}
        data-sl-align={align}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
  sortable?: boolean
  align?: 'start' | 'end'
}
