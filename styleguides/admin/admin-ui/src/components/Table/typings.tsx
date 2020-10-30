import { ReactNode } from 'react'
import { SizeStyleProps } from '@vtex/admin-ui-theme'

import { BaseResolvers } from './resolvers/base'

type WithResponsiveWidth = Pick<SizeStyleProps, 'width'>

/**
 * Column type
 * Each column, represents a field within an item
 * @generic T: Item
 * @generic R: Resolver filed
 */
export type Column<T, R = BaseResolvers<T>> =
  | ({
      id: keyof T
      header?: ((column: Column<T>) => ReactNode) | string
      acessor?: ((item: T) => ReactNode) | string
      resolver?: R
    } & WithResponsiveWidth)
  | ({
      id: Exclude<string, keyof T>
      header?: ((column: Column<T>) => ReactNode) | string
      acessor: ((item: T) => ReactNode) | string
      resolver?: R
    } & WithResponsiveWidth)
  | ({
      id: Exclude<string, keyof T>
      header?: ((column: Column<T>) => ReactNode) | string
      acessor?: ((item: T) => ReactNode) | string
      resolver: R
    } & WithResponsiveWidth)

export type TableDensity = 'compact' | 'regular' | 'variable'
export type TableDir = 'ltr' | 'rtl'
