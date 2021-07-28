import { plainResolver, PlainResolver } from './plain'
import { dateResolver, DateResolver } from './date'
import { currencyResolver, CurrencyResolver } from './currency'
import { rootResolver, RootResolver } from './root'
import { imageResolver, ImageResolver } from './image'
import { SelectionResolver, selectionResolver } from './selection'

/**
 * Table base resolvers
 */
export function baseResolvers<T>() {
  return {
    plain: plainResolver<T>(),
    date: dateResolver<T>(),
    currency: currencyResolver<T>(),
    image: imageResolver<T>(),
    root: rootResolver<T>(),
    selection: selectionResolver<T>(),
  }
}

export type BaseResolvers<T> =
  | PlainResolver<T>
  | ImageResolver<T>
  | CurrencyResolver<T>
  | DateResolver<T>
  | RootResolver<T>
  | SelectionResolver<T>
