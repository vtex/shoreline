import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(function TableHeaderCell(props, ref) {
  return <th data-sl-table-header-cell ref={ref} {...props} />
})

export type TableHeaderCellProps = ComponentPropsWithoutRef<'th'>
