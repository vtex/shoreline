import React from 'react'
import type {
  OnChangeFn,
  SortingState,
  TableOptions,
} from '@tanstack/react-table'
import {
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import { forwardRef, useMergeRef } from '@vtex/shoreline-utils'

import type { TableProps } from '../table'
import './simple-table.css'
import { Table, TableRow, TableBody, TableCell } from '../table'
import { Virtual } from '../virtual'
import { SimpleTableRow } from './simple-table-row'
import type { SimpleTableRowProps } from './simple-table-row'
import { SimpleTableHeader } from './simple-table-header'

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
    rowClick,
    sortable = false,
    setSort,
    sort,
    columnWidths = [
      `repeat(${columns.length}, var(--sl-table-default-column-width))`,
    ],
    virtualize = false,
    ...tableProps
  } = props

  // this is necessary because adding onSortingChange below breaks
  // the uncontrolled behaviour, even when undefined
  const customSort = setSort ? { onSortingChange: setSort } : {}

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: sortable,
    state: sort ? { sorting: sort } : undefined,
    manualSorting: !!setSort,
    ...customSort,
    ...options,
  })

  const { rows } = table.getRowModel()

  return !virtualize ? (
    <Table
      data-sl-simple-table
      ref={ref}
      columnWidths={columnWidths}
      {...tableProps}
    >
      <SimpleTableHeader headers={table.getHeaderGroups()} />

      <TableBody>
        {rows.map((row) => (
          <SimpleTableRow
            row={row}
            key={row.id}
            renderDetail={renderDetail}
            rowClick={rowClick}
          />
        ))}
      </TableBody>
    </Table>
  ) : (
    <Virtual items={rows}>
      {({ bottom, top, getItem, items, ref: virtualizerRef }) => {
        const mergedRef = useMergeRef(ref, virtualizerRef)

        return (
          <Table
            data-sl-simple-table
            ref={mergedRef}
            columnWidths={columnWidths}
            data-virtualize
            {...tableProps}
          >
            <SimpleTableHeader headers={table.getHeaderGroups()} />

            <TableBody>
              {top > 0 &&
                columns.map((column) => (
                  <TableRow key={column.id}>
                    <TableCell style={{ height: `${top}px` }} />
                  </TableRow>
                ))}
              {items.map((tableRow) => {
                const row = getItem(tableRow)

                return (
                  <SimpleTableRow
                    row={row}
                    key={row.id}
                    renderDetail={renderDetail}
                    rowClick={rowClick}
                  />
                )
              })}
              {bottom > 0 &&
                columns.map((column) => (
                  <TableRow key={column.id}>
                    <TableCell style={{ height: `${bottom}px` }} />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )
      }}
    </Virtual>
  )
})

type CoreProps = 'data' | 'columns' | 'getRowCanExpand'

type Options<T> = Omit<TableOptions<T>, CoreProps | 'getCoreRowModel'> &
  Partial<Pick<TableOptions<T>, 'getCoreRowModel'>>

type TsMirrorProps<T> = Pick<TableOptions<T>, CoreProps>

export interface SimpleTableProps<T>
  extends TableProps,
    TsMirrorProps<T>,
    Pick<SimpleTableRowProps<T>, 'rowClick' | 'renderDetail'> {
  /**
   * Other TanStack/Table options
   * @see https://tanstack.com/table/v8/docs/api/core/table
   */
  options?: Options<T>
  /**
   * Defines if columns will be sortable
   * @default false
   */
  sortable?: boolean
  /**
   * SortingState for controlled sort usage
   */
  sort?: SortingState
  /**
   * Setter for SortingState for controlled sort usage
   */
  setSort?: OnChangeFn<SortingState> | undefined
  /**
   * Whether the table body rows should be virtualized or not
   * @default false
   */
  virtualize?: boolean
}
