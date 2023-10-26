import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import type { Row, TableOptions } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
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
  const {
    data,
    columns,
    options,
    getRowCanExpand,
    renderDetail,
    ...tableProps
  } = props

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
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
          <Fragment key={row.id}>
            <TableRow
              data-selected={row.getIsSelected()}
              data-expanded={row.getIsExpanded()}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
            {row.getIsExpanded() && (
              <TableRow data-sl-detail-row data-selected={row.getIsSelected()}>
                <TableCell colSpan={row.getVisibleCells().length}>
                  {renderDetail?.(row)}
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  )
})

type CoreProps = 'data' | 'columns' | 'getRowCanExpand'

type Options<T> = Omit<TableOptions<T>, CoreProps | 'getCoreRowModel'> &
  Partial<Pick<TableOptions<T>, 'getCoreRowModel'>>

type TsMirrorProps<T> = Pick<TableOptions<T>, CoreProps>

export interface SimpleTableProps<T> extends TableProps, TsMirrorProps<T> {
  /**
   * Other TanStack/Table options
   * @see https://tanstack.com/table/v8/docs/api/core/table
   */
  options?: Options<T>
  /**
   * Renders function for the detail row
   */
  renderDetail?: (row: Row<T>) => ReactNode
}
