import { ReactNode } from 'react'
import { ResponsiveValue } from 'styled-system'

import { Sizes } from '../../theme/config'
import { BaseResolvers } from './resolvers/base'

/**
 * Column type
 * Each column, represents a field withn a item
 * @generic T: Item
 * @generic R: Resolver filed
 */
export type Column<T, R = BaseResolvers<T>> =
  | {
      id: keyof T
      width?: ResponsiveValue<Sizes | number>
      lead?: ((column: Column<T>) => ReactNode) | string
      acessor?: ((item: T) => ReactNode) | string
      resolver?: R
    }
  | {
      id: Exclude<string, keyof T>
      width?: ResponsiveValue<Sizes | number>
      lead?: ((column: Column<T>) => ReactNode) | string
      acessor: ((item: T) => ReactNode) | string
      resolver?: R
    }
  | {
      id: Exclude<string, keyof T>
      width?: ResponsiveValue<Sizes | number>
      lead?: ((column: Column<T>) => ReactNode) | string
      acessor?: ((item: T) => ReactNode) | string
      resolver: R
    }
