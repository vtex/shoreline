import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import type { TableBodyRowContextProps } from './types'

export const TableBodyRowContext =
  createContext<TableBodyRowContextProps | null>(null)

export function useTableBodyRowContext<T>() {
  const ctx = useContext(TableBodyRowContext)

  invariant(
    ctx,
    'You must use TableBodyCell composites in the right position. (i.e under a TableBodyRow)'
  )

  return ctx as TableBodyRowContextProps<T>
}
