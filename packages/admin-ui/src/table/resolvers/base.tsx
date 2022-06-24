import type { PlainResolver } from './plain'
import { plainResolver } from './plain'
import type { DateResolver } from './date'
import { dateResolver } from './date'
import type { CurrencyResolver } from './currency'
import { currencyResolver } from './currency'
import type { RootResolver } from './root'
import { rootResolver } from './root'
import type { ImageResolver } from './image'
import { imageResolver } from './image'
import type { SelectionResolver } from './selection'
import { selectionResolver } from './selection'
import type { TextResolver } from './text'
import { textResolver } from './text'

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
    text: textResolver<T>(),
  }
}

export type BaseResolvers<T> =
  | PlainResolver<T>
  | ImageResolver<T>
  | CurrencyResolver<T>
  | DateResolver<T>
  | RootResolver<T>
  | SelectionResolver<T>
  | TextResolver<T>
