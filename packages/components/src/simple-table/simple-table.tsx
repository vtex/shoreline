import React from 'react'
import type { ColumnDef, TableOptions } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { forwardRef } from '@vtex/shoreline-utils'

import type { TableProps } from '../table'
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '../table'

/**
 * Controlled table render built on top of TanStack/Table API
 * @see https://tanstack.com/table/v8
 * @example
 * <SimpleTable data={[]} columsn={[]} options={{}} />
 */
export const SimpleTable = forwardRef(function SimpleTable<T>(
  props: SimpleTableProps<T>,
  ref: React.Ref<HTMLTableElement>
) {
  const { data, columns, options, ...tableProps } = props

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...options,
  })

  return (
    <Table data-sl-simple-table ref={ref} {...tableProps}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

export interface SimpleTableProps<T> extends TableProps {
  /**
   * Table data
   */
  data: T[]
  /**
   * Table columns
   */
  columns: Array<ColumnDef<T, any>>
  /**
   * Other TanStack/Table options
   * @see https://tanstack.com/table/v8/docs/api/core/table
   */
  options?: Omit<TableOptions<T>, 'getCoreRowModel' | 'data' | 'columns'> &
    Partial<Pick<TableOptions<T>, 'getCoreRowModel'>>
}
