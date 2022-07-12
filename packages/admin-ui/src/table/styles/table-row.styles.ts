import { style } from '@vtex/admin-ui-core'
import type { TableColumn } from '../types'

interface RowOptions {
  columns: Array<TableColumn<any>>
}
export const rowBaseline = ({ columns }: RowOptions) =>
  style({
    display: 'grid',
    bg: '$primary',
    textAlign: 'left',
    borderBottom: '$neutral',
    gridTemplateColumns: columns
      .map((column) => (column.width ? `${column.width}px` : '1fr'))
      .join(' '),
  })
