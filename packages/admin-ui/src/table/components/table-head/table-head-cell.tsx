import React, { useMemo, Fragment } from 'react'
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
} as any

export function TableHeadCell<T>(props: TableHeadCellProps<T>) {
  const {
    column,
    lastFixedColumn,
    tableRef,
    resolveHeader,
    sortState,
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

  const csx = useMemo(
    () => ({
      ...styles.columnCell,
      ...styles.variant({ hasVerticalScroll }),
    }),
    [hasVerticalScroll]
  )

  return (
    <TableCell
      {...restProps}
      {...cellProps}
      lastFixedColumn={lastFixedColumn}
      tableRef={tableRef}
      column={column}
      role="columnheader"
      csx={csx}
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
      (
      <Fragment>
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
      </Fragment>
      ),
    </Box>
  )
}

export interface SortIndicatorOptions {
  direction?: 'ASC' | 'DESC' | null
}
