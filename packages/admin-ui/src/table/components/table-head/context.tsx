import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import type { TableHeadState } from '../../hooks/use-table-state'

export const TableHeadContext = createContext<TableHeadState<any> | null>(null)

export function useTableHeadContext<T = any>() {
  const ctx = useContext(TableHeadContext)

  invariant(
    ctx,
    'You must use TableHeadCell composites in the right position. (i.e under a TableHead)'
  )

  return ctx as TableHeadState<T>
}
