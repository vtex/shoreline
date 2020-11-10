import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import { TableDir } from './typings'

/**
 * Context of table styles
 */
export const StylesContext = createContext<StylesContextType | null>(null)

/**
 * Context of cell roles
 */
export const CellRoleContext = createContext<CellRole | null>(null)

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

type StylesContextType = {
  variants: {
    base: string
    table: string
    header: string
    body: string
    row: string
    cell: string
    columnheader: string
  }
  /**
   * layout direction
   */
  dir: TableDir
}

type CellRole = 'columnheader' | 'cell'
