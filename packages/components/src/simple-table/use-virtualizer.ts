import type { Row, Table } from '@tanstack/react-table'
import { useRef } from 'react'
import type { VirtualItem } from 'react-virtual'
import { useVirtual } from 'react-virtual'

export function useVirtualizer<T>(table: Table<T>, virtualize: boolean) {
  const { rows } = table.getRowModel()

  const ref = useRef(null)

  const { virtualItems: virtualRows, totalSize } = useVirtual({
    parentRef: ref,
    size: rows.length,
    overscan: 10,
  })

  const resolvedRows = virtualize ? virtualRows : rows

  const { top, bottom } = getVirtualizerDim(virtualRows, totalSize, virtualize)

  function getRow(row: Row<T> | VirtualItem): Row<T> {
    if (virtualize) return rows[row.index]

    return row as Row<T>
  }

  return {
    top,
    bottom,
    rows: resolvedRows,
    ref,
    getRow,
  }
}

/**
 * Return the dimensions between the first and last rows
 */
function getVirtualizerDim(
  rows: VirtualItem[],
  totalSize: number,
  virtualize: boolean
) {
  if (!virtualize || rows.length === 0) return { bottom: 0, top: 0 }

  const firstRow = rows?.[0]
  const lastRow = rows?.[rows.length - 1]

  const top = firstRow.start || 0
  const bottom = totalSize - (lastRow?.end || 0)

  return { bottom, top }
}
