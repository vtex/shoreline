import { csx } from '@vtex/admin-ui-core'
import type { TableColumn } from '../../types'

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

export const tableStyle = ({ columns }: RowOptions) => ({
  '--table-columns-template': columns.map(getColumnWidth).join(' '),
})

export const tableTheme = csx({
  display: 'grid',
  overflow: 'auto',
  gridTemplateColumns: 'var(--table-columns-template)',
  gridAutoRows: 'minmax(min-content, auto)',
})
