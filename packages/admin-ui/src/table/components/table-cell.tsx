import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import { cx } from '@vtex/admin-ui-core'
import * as styles from '../styles/table-cell.styles'
import type { TableColumn } from '../types'
import React, { useRef, useEffect } from 'react'
import { useStateContext } from '../context'
import { Box } from '../../box'
import { useForkRef } from '@vtex/admin-ui-hooks'
import { useTableScroll } from '../hooks/use-table-scroll'

export const TableCell = createComponent<'div', CellOptions>((props) => {
  const {
    column,
    onClick,
    role = 'cell',
    ref: htmlRef,
    children,
    className = '',
    ...cellProps
  } = props

  const { columns, tableRef } = useStateContext()

  const clickable = !!onClick

  const isFixed = Boolean(column?.fixed)

  const [lastFixedColumn] = columns.filter((col) => !!col?.fixed).slice(-1)

  const isLastFixedColumn = isFixed && lastFixedColumn?.id === column?.id

  const hasHorizontalScroll = () => {
    if (!isLastFixedColumn) {
      return false
    }

    const { hasHorizontalScroll } = useTableScroll()

    return hasHorizontalScroll
  }

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tableRef?.current || !ref?.current || !isFixed) {
      return
    }

    const isBodyCell = ref.current.getAttribute('role') === 'cell'

    const table = tableRef.current

    // Remove the table left space when placing the fixed columns on the scroll
    ref.current.style.left = isBodyCell
      ? `${ref.current.offsetLeft - table.offsetLeft}px`
      : `${ref.current.offsetLeft}px`
  }, [])

  return useElement('div', {
    ref: useForkRef(ref, htmlRef as any),
    className: isFixed ? cx('__admin-ui-fixed-cell', className) : className,
    baseStyle: {
      ...styles.baseline,
      ...styles.variants({
        clickable,
        fixed: isFixed,
        lastFixed: isLastFixedColumn,
        hasHorizontalScroll: hasHorizontalScroll(),
      }),
    },
    role,
    onClick,
    ...cellProps,
    children: isFixed ? (
      <Box csx={styles.fixedInnerContainer}>{children}</Box>
    ) : (
      children
    ),
  })
})

export interface CellOptions extends VariantProps<typeof styles.variants> {
  column?: TableColumn<any>
}

export type CellProps = React.ComponentPropsWithRef<typeof TableCell>
