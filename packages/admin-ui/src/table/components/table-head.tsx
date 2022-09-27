import React, { Fragment, memo } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { IconArrowDown, IconArrowUp } from '@vtex/phosphor-icons'

import * as styles from '../styles/table-head.styles'
import { Box } from '../../box'

import { useTableScroll } from '../hooks/use-table-scroll'
import type { TableHeadState } from '../hooks/use-table-state'
import { TableCell } from './table-cell'

export interface TableHeadOptions {
  state: TableHeadState
}

export const TableHead = memo(
  createComponent<'thead', TableHeadOptions>((props) => {
    const { children, state, ...headProps } = props
    const { columns, data, resolveHeader, sortState, tableRef, cell } = state

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

            const ariaSort = {
              ...(sortDirection && {
                'aria-sort': ariaSortLabel[sortDirection],
              }),
            }

            return (
              <TableCell
                state={cell}
                {...ariaSort}
                role="columnheader"
                csx={{
                  ...styles.columnCell,
                  ...styles.variant({ hasVerticalScroll }),
                }}
                columnId={column.id}
                onClick={() => {
                  if (!isSortable) return

                  sortState.sort(column.id)
                }}
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
