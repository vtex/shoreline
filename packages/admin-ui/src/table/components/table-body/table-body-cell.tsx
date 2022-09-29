import type { ReactNode } from 'react'
import React, { memo } from 'react'
import type { DataViewStatus } from '../../../data-view'
import type {
  ResolverCallee,
  ResolveCellArgs,
} from '../../resolvers/resolver-core'

import type { TableCellProps } from '../table-cell'
import { TableCell } from '../table-cell'

function TableBodyCell<T>(props: TableBodyCellProps<T>) {
  const { column, item, resolveCell, tableRef, lastFixedColumn, ...restProps } =
    props

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

export interface TableBodyCellProps<T> extends TableCellProps<T> {
  item: T
  status: DataViewStatus
  resolveCell: (args: ResolverCallee<ResolveCellArgs<T>>) => ReactNode
  key: React.Key
}

export const TBodyCell = memo(TableBodyCell) as typeof TableBodyCell
