import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import { DataGridState } from './hooks/useDataGridState'

/**
 * TODO: Still WIP
 */
export const StateContext = createContext<DataGridState<any> | null>(null)

export function useStateContext() {
  const ctx = useContext(StateContext)

  invariant(ctx, '💣 Missing state')

  return ctx
}

/**
 * Context of table view
 */
export const ViewContext = createContext<TableViewState | null>(null)

/**
 * Get table view state
 */
export function useViewContext() {
  const ctx = useContext(ViewContext)

  invariant(ctx, 'The table view must not be used outside of its context')

  return ctx
}

export interface TableViewState {
  /**
   * Whether the table is loading or not
   * @default false
   */
  loading?: boolean
  /**
   * Displays table empty state
   * @default false
   */
  empty?: boolean
  /**
   * Displays table state when there're no items found
   * @default false
   */
  itemsNotFound?: boolean
  /**
   * Displays table error state
   * @default false
   */
  error?: boolean
}
