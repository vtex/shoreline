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
import type { MenuResolver } from './menu'
import { menuResolver } from './menu'
import type { BulkResolver } from './bulk'
import { bulkResolver } from './bulk'

export type BaseResolvers<T> =
  | PlainResolver<T>
  | ImageResolver<T>
  | CurrencyResolver<T>
  | DateResolver<T>
  | RootResolver<T>
  | SelectionResolver<T>
  | TextResolver<T>
  | MenuResolver<T>
  | BulkResolver<T>

export const resolvers = {
  plain: plainResolver(),
  date: dateResolver(),
  currency: currencyResolver(),
  image: imageResolver(),
  root: rootResolver(),
  selection: selectionResolver(),
  text: textResolver(),
  menu: menuResolver(),
  bulk: bulkResolver(),
}
