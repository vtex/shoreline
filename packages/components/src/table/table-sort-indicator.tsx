import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { IconArrowDown, IconArrowUp } from '@vtex/shoreline-icons'

export const TableSortIndicator = forwardRef<
  HTMLDivElement,
  TableSortIndicatorProps
>(function TableSortIndicator(props, ref) {
  const {
    sortable = false,
    sorted = false,
    align = 'start',
    ...otherProps
  } = props

  return (
    <div
      data-sl-table-sort-indicator
      data-sl-align={align}
      ref={ref}
      {...otherProps}
    >
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
  /**
   * Indicates if column is sortable
   * @default null
   */
  sortable?: boolean
  align?: 'start' | 'end'
}
