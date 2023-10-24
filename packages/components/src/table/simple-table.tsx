import React from 'react'
import type { ColumnDef, TableOptions } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import type { TableProps } from './table'
import { Table } from './table'
import { TableHeader } from './table-header'
import { TableRow } from './table-row'
import { TableHeaderCell } from './table-header-cell'
import { TableBody } from './table-body'
import { TableCell } from './table-cell'

export const SimpleTable = genericForwardRef(function SimpleTable<T>(
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
    <Table ref={ref} {...tableProps}>
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

interface SimpleTableProps<T> extends TableProps {
  data: T[]
  columns: Array<ColumnDef<T, any>>
  options?: Omit<TableOptions<T>, 'getCoreRowModel' | 'data' | 'columns'> &
    Partial<Pick<TableOptions<T>, 'getCoreRowModel'>>
}

function genericForwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
): (props: P & React.RefAttributes<T>) => React.ReactNode | null {
  return React.forwardRef(render) as unknown as (
    props: P & React.RefAttributes<T>
  ) => React.ReactNode | null
}
