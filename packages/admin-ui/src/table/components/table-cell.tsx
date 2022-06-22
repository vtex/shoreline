import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import * as styles from '../styles/table-cell.styles'
import type { TableColumn } from '../types'

export const TableCell = createComponent<'td', CellOptions>((props) => {
  const {
    column,
    onClick,
    csx,
    role = 'cell',
    density = 'compact',
    ...cellProps
  } = props

  const clickable = !!onClick

  return useElement('td', {
    baseStyle: {
      ...styles.baseline,
      ...styles.variants({ density, clickable }),
    },
    role,
    csx: {
      minWidth: column?.width,
      maxWidth: column?.width,
      width: column?.width,
      ...csx,
    },
    onClick,
    ...cellProps,
  })
})

export interface CellOptions extends VariantProps<typeof styles.variants> {
  column?: TableColumn<any>
}
