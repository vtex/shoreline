import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(function TableHeaderCell(props, ref) {
  const { sticky, ...otherProps } = props

  return (
    <th
      data-sl-table-header-cell
      data-sticky={sticky}
      ref={ref}
      {...otherProps}
    />
  )
})

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<'th'> {
  sticky?: boolean
}
