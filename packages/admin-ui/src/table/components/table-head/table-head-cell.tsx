import type { ComponentPropsWithoutRef } from 'react'
import React, { memo } from 'react'
import { IconArrowUp, IconArrowDown } from '@vtex/phosphor-icons'

import type { TableCellProps } from '../table-cell'
import { TableCell } from '../table-cell'
import { useTableScroll } from '../../hooks/use-table-scroll'

import type {
  ResolveHeaderArgs,
  ResolveHeaderReturn,
  ResolverCallee,
} from '../../resolvers/resolver-core'

import type { UseSortReturn } from '../../hooks/use-table-sort'
import {
  columnCellTheme,
  sortableContainerTheme,
  sortIndicatorTheme,
  sortIndicatorUpTheme,
} from '../styles/table-head.css'
import { cx } from '@vtex/admin-ui-core'

const ariaSortLabel = {
  ASC: 'ascending',
  DESC: 'descending',
} as Record<'ASC' | 'DESC', 'descending' | 'ascending'>

function TableHeadCell<T>(props: TableHeadCellProps<T>) {
  const {
    column,
    lastFixedColumn,
    tableRef,
    resolveHeader,
    sortState,
    className = '',
    ...restProps
  } = props

  const { hasVerticalScroll } = useTableScroll({ tableRef })

  const { content, isSortable, sortDirection } = resolveHeader({
    column,
  })

  const cellProps = {
    ...(sortDirection && {
      'aria-sort': ariaSortLabel[sortDirection],
    }),
    ...(isSortable && {
      onClick: () => sortState.sort(column.id),
    }),
  }

  console.log({ hasVerticalScroll })

  return (
    <TableCell
      {...restProps}
      {...cellProps}
      lastFixedColumn={lastFixedColumn}
      tableRef={tableRef}
      column={column}
      role="columnheader"
      className={cx(columnCellTheme, className)}
      data-vertical-scroll={hasVerticalScroll}
      key={String(column.id)}
    >
      {isSortable ? (
        <div className={sortableContainerTheme}>
          {content}
          <SortIndicator direction={sortDirection} />
        </div>
      ) : (
        content
      )}
    </TableCell>
  )
}

export const THeadCell = memo(TableHeadCell) as typeof TableHeadCell
export interface TableHeadCellProps<T> extends TableCellProps<T> {
  resolveHeader: (
    args: ResolverCallee<ResolveHeaderArgs<T>>
  ) => ResolveHeaderReturn
  sortState: UseSortReturn
  key: React.Key
}

function SortIndicator(props: SortIndicatorProps) {
  const { direction, ...restProps } = props

  return (
    <div className={sortIndicatorTheme} {...restProps}>
      {direction !== 'DESC' ? (
        <IconArrowUp
          size="small"
          data-direction={direction?.toLowerCase()}
          className={sortIndicatorUpTheme}
        />
      ) : (
        <IconArrowDown size="small" />
      )}
    </div>
  )
}

export type SortIndicatorProps = ComponentPropsWithoutRef<'div'> & {
  direction?: 'ASC' | 'DESC' | null
}
