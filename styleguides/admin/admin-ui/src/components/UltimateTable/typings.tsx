import { ReactNode } from 'react'

import { BaseResolvers } from './resolvers/base'

/**
 * Column type
 * Each column, represents a field within an item
 * @template T: Item
 * @template R: Resolver filed
 */
export type Column<T, R = BaseResolvers<T>> =
  | {
      id: keyof T
      header?: ((column: Column<T>) => ReactNode) | string
      acessor?: ((item: T) => ReactNode) | string
      resolver?: R
      // TODO FIX
      width?: any
      compare?: (a: T, b: T) => number
      sortable?: boolean
    }
  | {
      id: Exclude<string, keyof T>
      header?: ((column: Column<T>) => ReactNode) | string
      acessor: ((item: T) => ReactNode) | string
      resolver?: R
      // TODO FIX
      width?: any
      compare?: (a: T, b: T) => number
      sortable?: boolean
    }
  | {
      id: Exclude<string, keyof T>
      header?: ((column: Column<T>) => ReactNode) | string
      acessor?: ((item: T) => ReactNode) | string
      resolver: R
      // TODO FIX
      width?: any
      compare?: (a: T, b: T) => number
      sortable?: boolean
    }

export type TableDensity = 'compact' | 'regular' | 'variable'
export type TableDir = 'ltr' | 'rtl'
