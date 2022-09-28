import React, { useRef, useEffect, memo } from 'react'
import { cx } from '@vtex/admin-ui-core'
import type { VariantProps, StyleProp } from '@vtex/admin-ui-core'
import { useForkRef } from '@vtex/admin-ui-hooks'

import type { TableCellState } from '../hooks/use-table-state'
import { Box } from '../../box'
import { useTableScroll } from '../hooks/use-table-scroll'

import * as styles from '../styles/table-cell.styles'

export const TableCell = memo((props: CellProps) => {
  const {
    fixed = false,
    columnId,
    onClick,
    role = 'cell',
    ref: htmlRef,
    children,
    className = '',
    lastFixedColumn,
    tableRef,
    ...cellProps
  } = props

  // const { lastFixedColumn, tableRef } = state

  const isLastFixedColumn = fixed && lastFixedColumn?.id === columnId

  const hasHorizontalScroll = () => {
    if (!isLastFixedColumn) {
      return false
    }

    const { hasHorizontalScroll } = useTableScroll({ tableRef })

    return hasHorizontalScroll
  }

  const ref = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    if (!ref?.current || !fixed) {
      return
    }

    ref.current.style.left = `${ref.current.offsetLeft}px`
  }, [])

  const resolvedClassName = fixed
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
          fixed,
          lastFixed: isLastFixedColumn,
          hasHorizontalScroll: hasHorizontalScroll(),
        }),
      }}
      className={resolvedClassName}
    >
      <Box csx={styles.innerContainer}>{children}</Box>
    </Box>
  )
})

TableCell.displayName = 'TableCell'

export interface CellOptions
  extends VariantProps<typeof styles.variants>,
    TableCellState {
  columnId?: string | number | symbol | undefined
  fixed?: boolean
}

export type CellProps = React.ComponentPropsWithRef<'td'> &
  CellOptions & { csx?: StyleProp }
