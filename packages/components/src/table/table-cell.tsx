import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(props, ref) {
    return <td data-sl-table-cell ref={ref} {...props} />
  }
)

export type TableCellProps = ComponentPropsWithoutRef<'td'>
