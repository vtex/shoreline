import type { ReactNode } from 'react'

import type { BaseResolvers } from './resolvers/base'

/**
 * Column type
 * Each column, represents a field within an item
 * @template T: Item
 * @template R: Resolver filed
 */
export type TableColumn<T, R = BaseResolvers<T>> =
  | {
      id: keyof T
      header?: ((column: TableColumn<T>) => ReactNode) | string
      accessor?: ((item: T) => ReactNode) | string
      resolver?: R
      width?: any
      compare?: (a: T, b: T) => number
      sortable?: boolean
      fixed?: boolean
    }
  | {
      id: Exclude<string, keyof T>
      header?: ((column: TableColumn<T>) => ReactNode) | string
      accessor: ((item: T) => ReactNode) | string
      resolver?: R
      width?: any
      compare?: (a: T, b: T) => number
      sortable?: boolean
      fixed?: boolean
    }
  | {
      id: Exclude<string, keyof T>
      header?: ((column: TableColumn<T>) => ReactNode) | string
      accessor?: ((item: T) => ReactNode) | string
      resolver: R
      width?: any
      compare?: (a: T, b: T) => number
      sortable?: boolean
      fixed?: boolean
    }
