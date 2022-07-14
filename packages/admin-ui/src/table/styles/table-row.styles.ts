import { style } from '@vtex/admin-ui-core'
import type { TableColumn } from '../types'

interface RowOptions {
  columns: Array<TableColumn<any>>
}

const getColumnWidth = (column: TableColumn<any>) => {
  if (column.width === undefined) {
    return '1fr'
  }

  if (typeof column.width === 'number') {
    return `${column.width}px`
  }

  return column.width
}

export const rowBaseline = ({ columns }: RowOptions) =>
  style({
    display: 'grid',
    bg: '$primary',
    borderBottom: '$neutral',
    gridTemplateColumns: columns.map(getColumnWidth).join(' '),
  })
