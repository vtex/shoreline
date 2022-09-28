import React, { Fragment, memo } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { IconArrowDown, IconArrowUp } from '@vtex/phosphor-icons'

import * as styles from '../styles/table-head.styles'
import { Box } from '../../box'

import { useTableScroll } from '../hooks/use-table-scroll'
import type { TableHeadState } from '../hooks/use-table-state'
import { TableCell } from './table-cell'

export type TableHeadOptions = TableHeadState

export const TableHead = memo(
  createComponent<'thead', TableHeadOptions>((props) => {
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

    return useElement('thead', {
      ...headProps,
      baseStyle: styles.baseline,
      role: 'rowgroup',
      children: (
        <Row>
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
                csx={csx as any}
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
        </Row>
      ),
    })
  })
)

TableHead.displayName = 'TableHead'

const Row = createComponent<'tr'>((props) => {
  return useElement('tr', {
    baseStyle: styles.rowBaseline,
    role: 'row',
    ...props,
  })
})

const SortIndicator = createComponent<'div', SortIndicatorOptions>((props) => {
  const { direction, ...restProps } = props

  return useElement('div', {
    ...restProps,
    baseStyle: styles.sortIndicator,
    children: (
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
  })
})

interface SortIndicatorOptions {
  direction?: 'ASC' | 'DESC' | null
}
