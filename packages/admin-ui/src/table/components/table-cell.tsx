import React, { useRef, useEffect, memo } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { cx } from '@vtex/admin-ui-core'
import type { VariantProps } from '@vtex/admin-ui-core'
import { useForkRef } from '@vtex/admin-ui-hooks'

import type { TableCellState } from '../hooks/use-table-state'
import { Box } from '../../box'
import { useTableScroll } from '../hooks/use-table-scroll'

import * as styles from '../styles/table-cell.styles'

export const TableCell = memo(
  createComponent<'td', CellOptions>((props) => {
    const {
      fixed = false,
      columnId,
      onClick,
      role = 'cell',
      ref: htmlRef,
      children,
      className = '',
      state,
      ...cellProps
    } = props

    const { lastFixedColumn, tableRef } = state

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

    return useElement('td', {
      ref: useForkRef(ref, htmlRef as any),
      className: resolvedClassName,
      baseStyle: {
        ...styles.baseline,
        ...styles.variants({
          clickable: !!onClick,
          fixed,
          lastFixed: isLastFixedColumn,
          hasHorizontalScroll: hasHorizontalScroll(),
        }),
      },
      role,
      onClick,
      ...cellProps,
      children: <Box csx={styles.innerContainer}>{children}</Box>,
    })
  })
)

TableCell.displayName = 'TableCell'

export interface CellOptions extends VariantProps<typeof styles.variants> {
  columnId?: string | number | symbol | undefined
  fixed?: boolean
  state: TableCellState
}

export type CellProps = React.ComponentPropsWithRef<typeof TableCell>
