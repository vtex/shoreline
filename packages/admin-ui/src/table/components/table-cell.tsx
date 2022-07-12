import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import * as styles from '../styles/table-cell.styles'
import type { TableColumn } from '../types'

export const TableCell = createComponent<'div', CellOptions>((props) => {
  const { column, onClick, role = 'cell', ...cellProps } = props

  const clickable = !!onClick

  return useElement('div', {
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
