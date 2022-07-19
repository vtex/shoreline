import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import * as styles from '../styles/table-cell.styles'
import type { TableColumn } from '../types'
import { useRef, useEffect } from 'react'

export const TableCell = createComponent<'div', CellOptions>((props) => {
  const { column, onClick, role = 'cell', ref, ...cellProps } = props

  const clickable = !!onClick

  const cellRef = useRef<'div'>(null)

  useEffect(() => {
    if (cellRef.current && column.position) {
      cellRef.current.style.position = column.position
      cellRef.current.style.left = `${cellRef.current.offsetLeft}px`
    }
  }, [])

  return useElement('div', {
    ref: cellRef,
    baseStyle: {
      ...styles.baseline,
      ...styles.variants({ clickable }),
    },
    role,
    onClick,
    ...cellProps,
  })
})

export interface CellOptions extends VariantProps<typeof styles.variants> {
  column?: TableColumn<any>
}

export type CellProps = React.ComponentPropsWithRef<typeof TableCell>
