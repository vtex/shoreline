import type { Ref } from 'react'
import React from 'react'
import {
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSortIndicator,
} from '@vtex/shoreline-components'
import type { TableHeaderProps } from '@vtex/shoreline-components'
import { flexRender } from '@tanstack/react-table'
import type { HeaderGroup } from '@tanstack/react-table'
import { forwardRef } from '@vtex/shoreline-utils'

export const TsTableHeader = forwardRef(function TsTableHeader<T>(
  props: TsTableRowProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const { headers, children, ...otherProps } = props

  return (
    <TableHeader {...otherProps} ref={ref}>
      {headers.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHeaderCell
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              sortable={header.column.getCanSort()}
              align={(header.column.columnDef.meta as any)?.align}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              <TableSortIndicator sorted={header.column.getIsSorted()} />
            </TableHeaderCell>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
})

export interface TsTableRowProps<T> extends TableHeaderProps {
  headers: Array<HeaderGroup<T>>
}
