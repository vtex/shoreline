/* eslint-disable @typescript-eslint/no-explicit-any */

/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'

import { Skeleton } from '../Skeleton'
import { baseResolvers } from './resolvers/base'
import { resolveField, resolveLead, Resolver } from './resolvers/core'
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
    getRowKey = (item: any) => item?.id ?? '',
    resolvers = baseResolvers<T>(),
    density = 'regular',
    rtl = false,
  } = props

  const dir = rtl ? 'rtl' : 'ltr'

  const styles: Record<string, SxStyleProp> = {
    table: {
      borderCollapse: 'collapse',
      tr: {
        textAlign: rtl ? 'right' : 'left',
      },
      'th, td': {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'muted.3',
        paddingX: 2,
        variant: 'text.body',
      },
      th: {
        color: 'muted.1',
        fontWeight: 'normal',
      },
      'thead > tr': {
        height: 48,
      },
      'tbody > tr': {
        height: density === 'regular' ? 80 : 48,
      },
    },
    skeleton: {
      height: 24,
    },
  }

  return (
    <table dir={dir} sx={styles.table}>
      <thead dir={dir}>
        <tr dir={dir}>
          {columns.map((column) => {
            const content = resolveLead<T>(column, resolvers)

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
          <tr dir={dir} key={getRowKey(item)}>
            {columns.map((column) => {
              const content = resolveField<T>(column, item, resolvers)

              return (
                <td dir={dir} key={column.id as string}>
                  {loading ? <Skeleton sx={styles.skeleton} /> : content}
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
  density?: 'compact' | 'regular'
  /**
   * If is rtl or not
   * @default false
   */
  rtl?: boolean
}
