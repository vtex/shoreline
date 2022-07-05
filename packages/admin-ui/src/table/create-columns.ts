import type { TableColumn } from './types'

/**
 * Utility to create typesafe columns
 * @param columns
 */
export function createColumns<T>(
  columns: Array<TableColumn<T>>
): Array<TableColumn<T>> {
  return columns
}
