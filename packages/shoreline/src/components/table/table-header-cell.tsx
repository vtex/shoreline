import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '../compose'

/**
 * Cell of the table header
 */
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

export interface TableHeaderCellOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Represents a sortable column
   * @default false
   */
  sortable?: boolean
  /**
   * Cell content alignment
   * @default 'start'
   */
  align?: 'start' | 'end'
}

export type TableHeaderCellProps = TableHeaderCellOptions &
  ComponentPropsWithoutRef<'div'>
