import type { RootResolver } from './root'
import { rootResolver } from './root'
import type { SimpleResolver } from './simple'
import { simpleResolver } from './simple'

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
