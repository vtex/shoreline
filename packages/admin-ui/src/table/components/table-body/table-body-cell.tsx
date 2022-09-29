import React, { memo } from 'react'
import type { CellProps } from '../table-cell'
import { TableCell } from '../table-cell'
import { useTableBodyRowContext } from './context'

function _TableBodyCell<T>(props: CellProps<T>) {
  const { column, ...restProps } = props

  const { item, resolveCell, tableRef, lastFixedColumn } =
    useTableBodyRowContext<T>()

  const content = resolveCell({ item, column })

  return (
    <TableCell
      {...restProps}
      column={column}
      tableRef={tableRef}
      lastFixedColumn={lastFixedColumn}
    >
      {content}
    </TableCell>
  )
}

export const TableBodyCell = memo(_TableBodyCell) as typeof _TableBodyCell
