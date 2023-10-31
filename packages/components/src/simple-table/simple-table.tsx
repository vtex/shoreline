import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import type {
  OnChangeFn,
  Row,
  SortingState,
  TableOptions,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  getSortedRowModel,
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
import type { NavigationTarget } from '../link-box/link-box-utils'
import { LinkBox } from '../link-box'
import { Clickable } from '../clickable'
import { IconArrowDown, IconArrowUp } from '@vtex/shoreline-icons'

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

  return (
    <Table
      data-sl-simple-table
      ref={ref}
      columnWidths={[
        `repeat(${columns.length}, var(--sl-table-default-column-width))`,
      ]}
      {...tableProps}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeaderCell
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                sortable={header.column.getCanSort()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {header.column.getIsSorted() === 'asc' ? (
                  <IconArrowUp />
                ) : header.column.getIsSorted() === 'desc' ? (
                  <IconArrowDown />
                ) : null}
              </TableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <TableRow
              selected={row.getIsSelected()}
              expanded={row.getIsExpanded()}
            >
              {row.getVisibleCells().map((cell) => {
                if (rowClick) {
                  if (rowClick.type === 'action') {
                    const { onClick } = rowClick

                    return (
                      <Clickable
                        onClick={() => onClick(row)}
                        key={cell.id}
                        asChild
                      >
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      </Clickable>
                    )
                  }

                  if (rowClick.type === 'link') {
                    const { getHref, target } = rowClick

                    return (
                      <LinkBox
                        href={getHref(row)}
                        target={target}
                        key={cell.id}
                        asChild
                      >
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      </LinkBox>
                    )
                  }
                }

                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
            {row.getIsExpanded() && (
              <TableRow data-sl-detail-row selected={row.getIsSelected()}>
                <TableCell
                  style={{
                    gridColumn: `1 / span ${row.getVisibleCells().length}`,
                  }}
                >
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
  /**
   * Defines if columns will be sortable
   * default: false
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
   *
   */
  rowClick?:
    | {
        type: 'link'
        getHref: (row: Row<T>) => string
        target?: NavigationTarget
      }
    | {
        type: 'action'
        onClick: (row: Row<T>) => void
      }
}
