import { BaseResolvers } from './resolvers/base'
import { DataGridColumn } from './typings'

/**
 * Utility to create typesafe columns
 * @param columns 
 */
export function createColumns<T>(
  columns: DataGridColumn<T, BaseResolvers<T>>[]
): DataGridColumn<T, BaseResolvers<T>>[] {
  return columns
}
