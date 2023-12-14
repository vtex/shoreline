import type { Ref } from 'react'
import React from 'react'
import {
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@vtex/shoreline-components'
import type { TableHeaderProps } from '@vtex/shoreline-components'
import { flexRender } from '@tanstack/react-table'
import type { HeaderGroup } from '@tanstack/react-table'
import { IconArrowDown, IconArrowUp } from '@vtex/shoreline-icons'
import { forwardRef } from '@vtex/shoreline-utils'

export const SimpleTableHeader = forwardRef(function SimpleTableHeader<T>(
  props: SimpleTableRowProps<T>,
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
  )
})

export interface SimpleTableRowProps<T> extends TableHeaderProps {
  headers: Array<HeaderGroup<T>>
}
