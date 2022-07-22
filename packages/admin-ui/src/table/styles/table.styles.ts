import { style } from '@vtex/admin-ui-core'
import type { TableColumn } from '../types'

interface RowOptions {
  columns: Array<TableColumn<any>>
}

const getColumnWidth = (column: TableColumn<any>) => {
  if (column.width === undefined) {
    return 'minmax(min-content, auto)'
  }

  if (typeof column.width === 'number') {
    return `${column.width}px`
  }

  return column.width
}

export const baseline = ({ columns }: RowOptions) =>
  style({
    display: 'grid',
    overflow: 'auto',
    gridTemplateColumns: columns.map(getColumnWidth).join(' '),
    gridAutoRows: 'minmax(min-content, auto)',
  })
