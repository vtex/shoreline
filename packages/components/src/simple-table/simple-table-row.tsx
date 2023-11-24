import type { ReactNode, Ref } from 'react'
import React, { Fragment } from 'react'
import { TableCell, TableRow, type TableRowProps } from '../table'
import { flexRender, type Row } from '@tanstack/react-table'
import type { NavigationTarget } from '../link-box/link-box-utils'
import { Clickable } from '../clickable'
import { LinkBox } from '../link-box'
import { forwardRef } from '@vtex/shoreline-utils'

export const SimpleTableRow = forwardRef(function SimpleTableRow<T>(
  props: SimpleTableRowProps<T>,
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
  )
})

export interface SimpleTableRowProps<T> extends TableRowProps {
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
