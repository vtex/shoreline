import type { DataGridColumn } from './types'

/**
 * Utility to create typesafe columns
 * @param columns
 */
export function createColumns<T>(
  columns: Array<DataGridColumn<T>>
): Array<DataGridColumn<T>> {
  return columns
}
