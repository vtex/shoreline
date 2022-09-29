import React, { useMemo, Fragment } from 'react'
import { IconArrowUp, IconArrowDown } from '@vtex/phosphor-icons'

import type { CellProps } from '../table-cell'
import { TableCell } from '../table-cell'
import { useTableScroll } from '../../hooks/use-table-scroll'
import type { BoxProps } from '../../../box'
import { Box } from '../../../box'

import * as styles from '../styles/table-head.styles'
import { useTableHeadContext } from './context'

export type TableHeadCellProps<T> = CellProps<T>

const ariaSortLabel = {
  ASC: 'ascending',
  DESC: 'descending',
} as any

export function TableHeadCell<T>(props: TableHeadCellProps<T>) {
  const { children, column, ...restProps } = props

  const { lastFixedColumn, resolveHeader, sortState, tableRef } =
    useTableHeadContext<T>()

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
