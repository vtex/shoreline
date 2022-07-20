import React, { cloneElement, Fragment } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { IconArrowDown, IconArrowUp } from '@vtex/phosphor-icons'

import { useStateContext } from '../context'
import { TableCell } from './table-cell'
import * as styles from '../styles/table-head.styles'
import { Box } from '../../box'

import { useTableScroll } from '../hooks/use-table-scroll'

export const TableHead = createComponent<'div'>((props) => {
  const { children, ...headProps } = props

  const { hasVerticalScroll } = useTableScroll()

  const state = useStateContext()

  const ariaSortLabel = {
    ASC: 'ascending',
    DESC: 'descending',
  } as any

  return useElement('div', {
    ...headProps,
    baseStyle: {
      ...styles.baseline,
      ...styles.variant({ hasVerticalScroll }),
    },
    role: 'rowgroup',
    children: (
      <Row>
        {state.columns.map((column) => {
          const { content, isSortable, sortDirection } = state.resolveHeader({
            column,
            items: state.data,
          })

          const cellProps = {
            column,
            role: 'columnheader',
            ...(sortDirection && {
              'aria-sort': ariaSortLabel[sortDirection],
            }),
            onClick: isSortable
              ? () => state.sortState.sort(column.id)
              : undefined,
            children: isSortable ? (
              <Box csx={styles.sortableContainer}>
                {content}
                <SortIndicator direction={sortDirection} />
              </Box>
            ) : (
              content
            ),
          } as any

          return (
            <Fragment key={String(column.id)}>
              {children ? (
                cloneElement(children as any, cellProps)
              ) : (
                <TableCell {...cellProps} />
              )}
            </Fragment>
          )
        })}
      </Row>
    ),
  })
})

const Row = createComponent<'div'>((props) => {
  const state = useStateContext()

  return useElement('div', {
    baseStyle: styles.rowBaseline({ columns: state.columns }),
    role: 'row',
    csx: { height: 50 },
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
