import type { ReactNode, Ref } from 'react'
import React, { Fragment } from 'react'
import { flexRender, type Row } from '@tanstack/react-table'
import type {
  TableRowProps,
  NavigationTarget,
} from '@vtex/shoreline-components'
import {
  Clickable,
  LinkBox,
  TableCell,
  TableRow,
} from '@vtex/shoreline-components'
import { forwardRef } from '@vtex/shoreline-utils'

export const TsTableRow = forwardRef(function TsTableRow<T>(
  props: TsTableRowProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const { row, id, rowClick, renderDetail, children, ...otherProps } = props

  return (
    <Fragment key={id}>
      <TableRow
        ref={ref}
        selected={row.getIsSelected()}
        expanded={row.getIsExpanded()}
        {...otherProps}
      >
        {row.getVisibleCells().map((cell) => {
          if (rowClick) {
            if (rowClick.type === 'action') {
              const { onClick } = rowClick

              return (
                <Clickable onClick={() => onClick(row)} key={cell.id} asChild>
                  <TableCell>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        <TableRow data-sl-ts-table-detail-row selected={row.getIsSelected()}>
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
  )
})

export interface TsTableRowProps<T> extends TableRowProps {
  row: Row<T>
  rowClick?: RowClick<T>
  renderDetail?: (row: Row<T>) => ReactNode
}

export type RowClick<T> =
  | {
      type: 'link'
      getHref: (row: Row<T>) => string
      target?: NavigationTarget | undefined
    }
  | {
      type: 'action'
      onClick: (row: Row<T>) => void
    }
  | undefined
