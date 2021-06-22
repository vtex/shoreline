import { RootResolver, rootResolver } from './root'
import { simpleResolver, SimpleResolver } from './simple'

/**
 * Filter base resolvers
 */
export function baseResolvers<T>() {
  return {
    simple: simpleResolver<T>(),
    root: rootResolver<T>(),
  }
}

export type BaseResolvers<T> = SimpleResolver<T> | RootResolver<T>
