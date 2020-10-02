/** @jsx jsx */
import { jsx } from 'theme-ui'
import { get } from '@vtex-components/theme'

import { Skeleton } from '../Skeleton'
import { baseResolvers } from './resolvers/base'
import {
  resolveField,
  resolveLead,
  Resolver,
  ResolverContext,
} from './resolvers/core'
import { Column } from './typings'

/**
 * Table used to show static & simple information
 * @example
 * ```jsx
 * import { DisplayTable, defineColumns } from `@vtex/admin-ui`
 *
 * type Item = {}
 *
 * const items: Item[] = []
 *
 * const columns = defineColumns<Item>([
 *  {
 *    id: '_item_property_',
 *    lead: '_title_of_column',
 *    width: ['...some_responsive_width'] | '_some_global_width_'
 *    resolver: {
 *      type: '_valid_resolver_type'
 *    }
 *  },
 *  ...
 * ])
 *
 * <DisplayTable columns={columns} items={items} />
 * ```
 */
export function DisplayTable<T>(props: DisplayTableProps<T>) {
  const {
    columns,
    items = [],
    loading = false,
    getRowKey = (item: T) => get((item as unknown) as object, 'id', ''),
    resolvers = baseResolvers<T>(),
    density = 'regular',
    dir = 'ltr',
  } = props

  const context: ResolverContext = {
    density,
    loading,
    dir,
  }

  return (
    <table
      dir={dir}
      sx={{
        variant: `data.table.${density}`,
      }}
    >
      <thead dir={dir}>
        <tr sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }} dir={dir}>
          {columns.map((column) => {
            const content = resolveLead<T>({ column, resolvers, context })

            return (
              <th
                dir={dir}
                sx={{ minWidth: column.width, maxWidth: column.width }}
                key={column.id as string}
              >
                {content}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody dir={dir}>
        {items.map((item) => (
          <tr
            sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
            dir={dir}
            key={getRowKey(item)}
          >
            {columns.map((column) => {
              const content = resolveField<T>({
                column,
                item,
                resolvers,
                context,
              })

              return (
                <td dir={dir} key={column.id as string}>
                  {loading ? (
                    <Skeleton sx={{ variant: 'data.table.skeleton' }} />
                  ) : (
                    content
                  )}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/**
 * Column type creator helper
 * @param columns
 */
export function defineColumns<T>(columns: Array<Column<T>>): Array<Column<T>> {
  return columns
}

export type TableDensity = 'compact' | 'regular' | 'variable'
export type TableDir = 'ltr' | 'rtl'
export interface DisplayTableProps<T> {
  /**
   * ditto
   */
  columns: Array<Column<T>>
  /**
   * ditto
   * @default []
   */
  items?: T[]
  /**
   * key extractor
   * @default (item)=>item.id
   */
  getRowKey?: (item: T) => string
  /**
   * if the table is loading or not
   * @default false
   */
  loading?: boolean
  /**
   * Table field resolvers
   * @default {baseResolvers}
   */
  resolvers?: Record<string, Resolver<T>>
  /**
   * Table row height
   * @default regular
   */
  density?: TableDensity
  /**
   * HTML Dir
   * @default 'ltr'
   */
  dir?: TableDir
}
