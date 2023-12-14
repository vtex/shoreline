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

import type {
  TableProps,
  UseVirtualizerModelReturn,
} from '@vtex/shoreline-components'
import './simple-table.css'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@vtex/shoreline-components'

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
    virtualizer,
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

  const mergedRef = useMergeRef(ref, virtualizer?.ref)

  return !virtualizer ? (
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
            id={row.id}
            renderDetail={renderDetail}
            rowClick={rowClick}
          />
        ))}
      </TableBody>
    </Table>
  ) : (
    <Table
      data-sl-simple-table
      ref={mergedRef}
      columnWidths={columnWidths}
      data-virtualize
      {...tableProps}
    >
      <SimpleTableHeader headers={table.getHeaderGroups()} />

      <TableBody>
        {virtualizer.top > 0 &&
          columns.map((column) => (
            <TableRow key={column.id}>
              <TableCell style={{ height: `${virtualizer.top}px` }} />
            </TableRow>
          ))}

        {virtualizer.virtualItems.map((tableRow) => {
          const row = rows[tableRow.index]

          return (
            <SimpleTableRow
              row={row}
              id={String(tableRow.index)}
              renderDetail={renderDetail}
              rowClick={rowClick}
            />
          )
        })}

        {virtualizer.bottom > 0 &&
          columns.map((column) => (
            <TableRow key={column.id}>
              <TableCell style={{ height: `${virtualizer.bottom}px` }} />
            </TableRow>
          ))}
      </TableBody>
    </Table>
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
   * Virtualizar table model
   */
  virtualizer?: UseVirtualizerModelReturn
}
