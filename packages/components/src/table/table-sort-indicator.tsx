import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { IconArrowDown, IconArrowUp } from '@vtex/shoreline-icons'

/**
 * Component that indicates if a column is sortable and its current sort direction
 * @example
 * <TableHeaderCell>
      {title}
      <TableSortIndicator sorted={sortDirection} />
    </TableHeaderCell>
 */
export const TableSortIndicator = forwardRef<
  HTMLDivElement,
  TableSortIndicatorProps
>(function TableSortIndicator(props, ref) {
  const { sorted = false, ...otherProps } = props

  return (
    <div data-sl-table-sort-indicator ref={ref} {...otherProps}>
      <div data-sl-table-sort-indicator-hover data-sl-sorted={sorted}>
        <IconArrowUp />
      </div>
      {sorted === 'asc' ? (
        <IconArrowUp />
      ) : sorted === 'desc' ? (
        <IconArrowDown />
      ) : null}
    </div>
  )
})

export interface TableSortIndicatorProps
  extends ComponentPropsWithoutRef<'div'> {
  /**
   * Indicates if column is currently sorted, and in witch order
   * @default null
   */
  sorted?: 'asc' | 'desc' | null
}
