import React, { useMemo, ReactNode } from 'react'
import { get } from '@vtex/admin-core'

import { ResolverContext } from './resolvers/core'
import { TableDensity, TableDir } from './typings'
import { useTable, UseTableParams } from './useTable'
import { Table } from './components'
import { SystemComponent } from '../../types'
import { Box, Flex } from '@vtex/admin-primitives'
import { TableToolbar } from './components/Toolbar'
import { TableSection } from './components/Section'
import { TableSearch } from './components/Search'
import { SortIndicator } from './components/SortIndicator'
import { TableViewResolver, TableViews } from './components/Views'
import { ViewContext, TableViewState } from './context'

/**
 * Table used to show static & simple information
 * @example
 * ```jsx
 * import { StatefulTable, defineColumns } from `@vtex/admin-ui`
 *
 * type Item = {}
 *
 * const items: Item[] = []
 *
 * const columns = defineColumns<Item>([
 *  {
 *    id: 'prop-to-access',
 *    lead: 'column-lead-text',
 *    width: ['...responsive-width'] | 'width'
 *    resolver: one of BaseResolvers<Item>
 *  },
 *  ...
 * ])
 *
 * <StatefulTable columns={columns} items={items} />
 * ```
 */

function _StatefulTable<T>(props: StatefulTableProps<T>) {
  const {
    columns,
    items = [],
    loading = false,
    getRowKey = (item: T) =>
      get((item as unknown) as Record<string, unknown>, 'id', ''),
    resolvers,
    density = 'regular',
    dir = 'ltr',
    length = 5,
    onRowClick,
    children,
    csx = {},
    sort,
    empty,
    error,
    itemsNotFound,
    views,
  } = props

  const context: ResolverContext = useMemo(
    () => ({
      density,
      loading,
      dir,
    }),
    [density, loading, dir]
  )

  const {
    data,
    resolveCell,
    resolveHeader,
    Providers,
    sortState,
  } = useTable<T>({
    length,
    columns,
    resolvers,
    context,
    items,
    sort,
  })

  return (
    <Box>
      <ViewContext.Provider value={{ loading, empty, error, itemsNotFound }}>
        {children}
        <Providers>
          <Box csx={{ overflow: 'auto', width: 'full', ...csx }}>
            <TableViewResolver views={views}>
              <Table dir={context.dir} density={density}>
                <Table.Head>
                  <Table.Row>
                    {columns.map((column) => {
                      const {
                        content,
                        isSortable,
                        sortDirection,
                      } = resolveHeader({
                        column,
                        items: data,
                      })

                      return (
                        <Table.Cell
                          key={column.id as string}
                          column={column}
                          onClick={
                            isSortable
                              ? () => sortState.sort(column.id)
                              : undefined
                          }
                        >
                          {isSortable ? (
                            <Flex align="center">
                              {content}
                              <SortIndicator direction={sortDirection} />
                            </Flex>
                          ) : (
                            content
                          )}
                        </Table.Cell>
                      )
                    })}
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {data.map((item) => (
                    <Table.Row
                      key={getRowKey(item) as string}
                      onClick={
                        typeof onRowClick === 'function'
                          ? () => onRowClick(item)
                          : undefined
                      }
                    >
                      {columns.map((column) => {
                        const content = resolveCell({
                          column,
                          item,
                        })

                        return (
                          <Table.Cell key={column.id as string} column={column}>
                            {content}
                          </Table.Cell>
                        )
                      })}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </TableViewResolver>
          </Box>
        </Providers>
      </ViewContext.Provider>
    </Box>
  )
}

export const StatefulTable = Object.assign(_StatefulTable, {
  Toolbar: TableToolbar,
  Section: TableSection,
  Search: TableSearch,
})

export interface StatefulTableProps<T>
  extends Omit<UseTableParams<T>, 'context'>,
    SystemComponent,
    TableViewState {
  /**
   * Key extractor
   * @default (item)=>item.id
   */
  getRowKey?: (item: T) => string
  /**
   * Table row height
   * @default regular
   */
  density?: TableDensity
  /**
   * Action to dispatch on a row click
   */
  onRowClick?: (item: T) => void
  /**
   * HTML Dir
   * @default 'ltr'
   */
  dir?: TableDir
  /**
   * Pagination component used in the table
   */
  children?: ReactNode

  views?: TableViews
}
