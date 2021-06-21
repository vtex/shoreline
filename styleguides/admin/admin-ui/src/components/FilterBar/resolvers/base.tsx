import { RootResolver, rootResolver } from './root'
import { simpleResolver, SimpleResolver } from './simple'

/**
 * Filter base resolvers
 */
export function baseResolvers<T, V extends { value: T }>() {
  return {
    simple: simpleResolver<T, V>(),
    root: rootResolver<T, V>(),
  }
}

export type BaseResolvers<T, V extends { value: T }> =
  | SimpleResolver<T, V>
  | RootResolver<T, V>
