import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import { TableDir } from './typings'
import { UseTableStateReturn } from './hooks/useTableState'

/**
 * TODO: Still WIP
 */
export const StateContext = createContext<UseTableStateReturn<any> | null>(null)

export function useStateContext() {
  const ctx = useContext(StateContext)

  invariant(ctx, '💣 Missing state')

  return ctx
}

/**
 * Context of table styles
 */
export const StylesContext = createContext<StylesContextType | null>(null)

/**
 * Context of cell roles
 */
export const CellRoleContext = createContext<CellRole | null>(null)

/**
 * Context of table view
 */
export const ViewContext = createContext<TableViewState | null>(null)

/**
 * Get table styles
 */
export function useStylesContext() {
  const ctx = useContext(StylesContext)

  invariant(ctx, 'Table composites must not be used outside of its context')

  return ctx
}

/**
 * Get cell role
 */
export function useCellRoleContext() {
  const ctx = useContext(CellRoleContext)

  invariant(ctx, 'A cell must be within a Table.Head or Table.Body context')

  return ctx
}

/**
 * Get table view state
 */
export function useViewContext() {
  const ctx = useContext(ViewContext)

  invariant(ctx, 'The table view must not be used outside of its context')

  return ctx
}

type StylesContextType = {
  variants: {
    base: string
    table: string
    header: string
    body: string
    row: string
    rowClickable: string
    cell: string
    columnheader: string
  }
  /**
   * layout direction
   */
  dir: TableDir
}

type CellRole = 'columnheader' | 'cell'

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
