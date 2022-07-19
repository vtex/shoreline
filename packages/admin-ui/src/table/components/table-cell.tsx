import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import * as styles from '../styles/table-cell.styles'
import type { TableColumn } from '../types'
import React, { useRef, useEffect } from 'react'
import { useStateContext } from '../context'
import { Box } from '../../box'

export const TableCell = createComponent<'div', CellOptions>((props) => {
  const { column, onClick, role = 'cell', ref, children, ...cellProps } = props
  const { columns } = useStateContext()

  const clickable = !!onClick
  const isFixed = !!column?.fixed

  const belongsToLastFixedColumn =
    isFixed &&
    columns.filter((currentColumn) => !!currentColumn?.fixed).slice(-1)[0] ===
      column

  const cellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cellRef.current && isFixed) {
      cellRef.current.style.left = `${cellRef.current.offsetLeft}px`
    }
  }, [])

  return useElement('div', {
    ref: cellRef as any,
    className: isFixed ? 'fixed-cell' : '',
    baseStyle: {
      ...styles.baseline,
      ...styles.variants({
        clickable,
        fixed: isFixed,
        lastFixed: belongsToLastFixedColumn,
      }),
    },
    role,
    onClick,
    ...cellProps,
    children: isFixed ? (
      <Box csx={{ ...styles.fixedInnerContainer }}>{children}</Box>
    ) : (
      children
    ),
  })
})

export interface CellOptions extends VariantProps<typeof styles.variants> {
  column?: TableColumn<any>
}

export type CellProps = React.ComponentPropsWithRef<typeof TableCell>
