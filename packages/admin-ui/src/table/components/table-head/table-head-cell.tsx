import React, { useMemo, memo } from 'react'
import { IconArrowUp, IconArrowDown } from '@vtex/phosphor-icons'

import type { TableCellProps } from '../table-cell'
import { TableCell } from '../table-cell'
import { useTableScroll } from '../../hooks/use-table-scroll'

import type {
  ResolveHeaderArgs,
  ResolveHeaderReturn,
  ResolverCallee,
} from '../../resolvers/resolver-core'
import type { BoxProps } from '../../../box'
import { Box } from '../../../box'

import * as styles from '../styles/table-head.styles'
import type { UseSortReturn } from '../../hooks/use-table-sort'

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
    csx,
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

  const resolvedStyles = useMemo(
    () => ({
      ...styles.columnCell,
      ...styles.variant({ hasVerticalScroll }),
      ...csx,
    }),
    [hasVerticalScroll, csx]
  )

  return (
    <TableCell
      {...restProps}
      {...cellProps}
      lastFixedColumn={lastFixedColumn}
      tableRef={tableRef}
      column={column}
      role="columnheader"
      csx={resolvedStyles}
      key={String(column.id)}
    >
      {isSortable ? (
        <Box csx={styles.sortableContainer}>
          {content}
          <SortIndicator direction={sortDirection} />
        </Box>
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

function SortIndicator(props: BoxProps & SortIndicatorOptions) {
  const { direction, ...restProps } = props

  return (
    <Box csx={styles.sortIndicator} {...restProps}>
      {direction !== 'DESC' ? (
        <IconArrowUp
          size="small"
          csx={{
            opacity: direction === 'ASC' ? 1 : 0,
          }}
        />
      ) : (
        <IconArrowDown size="small" />
      )}
    </Box>
  )
}

export interface SortIndicatorOptions {
  direction?: 'ASC' | 'DESC' | null
}
