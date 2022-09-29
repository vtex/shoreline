import React, { useRef, useEffect, memo } from 'react'
import { cx } from '@vtex/admin-ui-core'
import type { VariantProps, StyleProp } from '@vtex/admin-ui-core'
import { useForkRef } from '@vtex/admin-ui-hooks'

import type { TableCellState } from '../hooks/use-table-state'
import { Box } from '../../box'
import { useTableScroll } from '../hooks/use-table-scroll'

import * as styles from './styles/table-cell.styles'
import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'

function _TableCell<T>(props: CellProps<T>) {
  const {
    column,
    onClick,
    role = 'cell',
    ref: htmlRef,
    children,
    className = '',
    lastFixedColumn,
    tableRef,
    csx,
    ...cellProps
  } = props

  const isLastFixedColumn = column?.fixed && lastFixedColumn?.id === column?.id

  const hasHorizontalScroll = () => {
    if (!isLastFixedColumn) {
      return false
    }

    const { hasHorizontalScroll } = useTableScroll({ tableRef })

    return hasHorizontalScroll
  }

  const ref = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    if (!ref?.current || !column?.fixed) {
      return
    }

    ref.current.style.left = `${ref.current.offsetLeft}px`
  }, [])

  const resolvedClassName = column?.fixed
    ? cx(
        '__admin-ui-fixed-cell',
        className,
        isLastFixedColumn ? '__admin-ui-last-fixed-cell' : ''
      )
    : className

  return (
    <Box
      {...cellProps}
      as="td"
      ref={useForkRef(ref, htmlRef)}
      onClick={onClick}
      role={role}
      csx={{
        ...styles.baseline,
        ...styles.variants({
          clickable: !!onClick,
          fixed: column?.fixed,
          lastFixed: isLastFixedColumn,
          hasHorizontalScroll: hasHorizontalScroll(),
        }),
        ...csx,
      }}
      className={resolvedClassName}
    >
      <Box csx={styles.innerContainer}>{children}</Box>
    </Box>
  )
}

export const TableCell = memo(_TableCell) as typeof _TableCell

export interface CellOptions<T>
  extends VariantProps<typeof styles.variants>,
    TableCellState<T> {
  column: TableColumn<T, BaseResolvers<T>>
}

export type CellProps<T> = React.ComponentPropsWithRef<'td'> &
  CellOptions<T> & { csx?: StyleProp }
