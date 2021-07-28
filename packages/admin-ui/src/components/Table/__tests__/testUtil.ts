import type { TableDensity, TableDir } from '../typings'

export const getStyles = (density: TableDensity) => {
  const base = `components.table.${density}`

  return {
    variants: {
      base,
      table: `${base}.table`,
      header: `${base}.header`,
      body: `${base}.body`,
      row: `${base}.row`,
      rowClickable: `${base}.row-clickable`,
      cell: `${base}.cell`,
      columnheader: `${base}.columnheader`,
    },
    dir: 'rtl' as TableDir,
  }
}
