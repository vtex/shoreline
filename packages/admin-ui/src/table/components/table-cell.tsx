import React, { useRef, useEffect } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { cx } from '@vtex/admin-ui-core'
import type { VariantProps } from '@vtex/admin-ui-core'
import { useForkRef } from '@vtex/admin-ui-hooks'

import type { TableColumn } from '../types'
import { useStateContext } from '../context'
import { Box } from '../../box'
import { useTableScroll } from '../hooks/use-table-scroll'

import * as styles from '../styles/table-cell.styles'

export const TableCell = createComponent<'td', CellOptions>((props) => {
  const {
    column,
    onClick,
    role = 'cell',
    ref: htmlRef,
    children,
    className = '',
    ...cellProps
  } = props

  const { columns } = useStateContext()

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

  const ref = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    if (!ref?.current || !isFixed) {
      return
    }

    ref.current.style.left = `${ref.current.offsetLeft}px`
  }, [])

  return useElement('td', {
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
    children: <Box csx={styles.innerContainer}>{children}</Box>,
  })
})

export interface CellOptions extends VariantProps<typeof styles.variants> {
  column?: TableColumn<any>
}

export type CellProps = React.ComponentPropsWithRef<typeof TableCell>
