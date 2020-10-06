/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { get } from '@vtex-components/theme'
import { useMemo } from 'react'

import { baseResolvers } from './resolvers/base'
import {
  resolveField,
  resolveLead,
  Resolver,
  ResolverContext,
} from './resolvers/core'
import { Column } from './typings'
import { Box } from '../Box'

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
    sx = {},
    length = 5,
  } = props

  const variant = `data.table.${density}`

  const context: ResolverContext = {
    density,
    loading,
    dir,
  }

  const skeletonItems = useMemo<T[]>(() => {
    return [...Array(length).keys()].map((id) => {
      const item = columns.reduce((acc, col) => {
        return { ...acc, [col.id]: '...loading' }
      }, {})

      return ({ id, ...item } as unknown) as T
    })
  }, [length, columns])

  const listToRender = loading ? skeletonItems : items

  return (
    <table
      dir={dir}
      sx={{
        variant: `${variant}.reset`,
        ...sx,
      }}
    >
      <thead
        sx={{
          textAlign: dir === 'rtl' ? 'right' : 'left',
        }}
        dir={dir}
      >
        <tr>
          {columns.map((column) => {
            const content = resolveLead<T>({ column, resolvers, context })

            return (
              <td dir={dir} key={column.id as string}>
                <Box
                  sx={{
                    variant: `${variant}.lead`,
                    minWidth: column.width,
                    maxWidth: column.width,
                    ...column.leadSx,
                  }}
                >
                  {content}
                </Box>
              </td>
            )
          })}
        </tr>
      </thead>
      <tbody dir={dir}>
        {listToRender.map((item) => (
          <tr
            sx={{
              textAlign: dir === 'rtl' ? 'right' : 'left',
            }}
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
                  <Box
                    sx={{
                      variant: `${variant}.cell`,
                      minWidth: column.width,
                      maxWidth: column.width,
                      ...column.fieldSx,
                    }}
                  >
                    {content}
                  </Box>
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
   * Table column spec
   */
  columns: Array<Column<T>>
  /**
   * Table items
   * @default []
   */
  items?: T[]
  /**
   * Key extractor
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
  /**
   * Sx of table
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * Expected items length
   * @default 5
   */
  length?: number
}
