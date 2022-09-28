import React, { Fragment, memo } from 'react'
import { IconArrowDown, IconArrowUp } from '@vtex/phosphor-icons'

import * as styles from '../styles/table-head.styles'
import type { BoxProps } from '../../box'
import { Box } from '../../box'

import { useTableScroll } from '../hooks/use-table-scroll'
import type { TableHeadState } from '../hooks/use-table-state'
import { TableCell } from './table-cell'
import type { StyleProp } from '@vtex/admin-ui-core'

export type TableHeadOptions = TableHeadState

export const TableHead = memo((props: TableHeadProps) => {
  const {
    children,
    columns,
    data,
    resolveHeader,
    sortState,
    tableRef,
    lastFixedColumn,
    ...headProps
  } = props
  // const { columns, data, resolveHeader, sortState, tableRef, cell } = state

  const { hasVerticalScroll } = useTableScroll({ tableRef })

  const ariaSortLabel = {
    ASC: 'ascending',
    DESC: 'descending',
  } as any

  return (
    <Box as="thead" csx={styles.baseline} role="rowgroup" {...headProps}>
      <Box as="tr" csx={styles.rowBaseline} role="row">
        {columns.map((column) => {
          const { content, isSortable, sortDirection } = resolveHeader({
            column,
            items: data,
          })

          const cellProps = {
            ...(sortDirection && {
              'aria-sort': ariaSortLabel[sortDirection],
            }),
            ...(isSortable && {
              onClick: () => sortState.sort(column.id),
            }),
          }

          const csx = React.useMemo(
            () => ({
              ...styles.columnCell,
              ...styles.variant({ hasVerticalScroll }),
            }),
            [hasVerticalScroll]
          )

          return (
            <TableCell
              {...cellProps}
              lastFixedColumn={lastFixedColumn}
              tableRef={tableRef}
              role="columnheader"
              csx={csx}
              columnId={column.id}
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
        })}
      </Box>
    </Box>
  )
})

export type TableHeadProps = TableHeadOptions &
  React.ComponentPropsWithoutRef<'thead'> & { csx?: StyleProp }

TableHead.displayName = 'TableHead'

const SortIndicator = (props: BoxProps & SortIndicatorOptions) => {
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

interface SortIndicatorOptions {
  direction?: 'ASC' | 'DESC' | null
}
