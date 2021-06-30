import React, { ReactNode } from 'react'

import { UseTableReturn } from '../Table/useTableState'
import { Table } from '../Table/components'
import { SystemComponent } from '../../types'
import { Box, Flex } from '@vtex/admin-primitives'
import { TableToolbar } from './components/Toolbar'
import { TableSection } from './components/Section'
import { TableSearch } from './components/Search'
import { SortIndicator } from '../Table/components/SortIndicator'
import { TableViewResolver, TableViewsType } from './components/Views'
import { ViewContext } from '../Table/context'

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
    state: {
      data,
      resolveCell,
      resolveHeader,
      Providers,
      sortState,
      columns,
      context,
      getRowKey,
      onRowClick,
    },
    children,
    csx = {},
    views,
  } = props

  return (
    <Box>
      <ViewContext.Provider
        value={{
          loading: context.loading,
          empty: context.empty,
          error: context.error,
          itemsNotFound: context.itemsNotFound,
        }}
      >
        {children}
        <Providers>
          <Box csx={{ overflow: 'auto', width: 'full', ...csx }}>
            <TableViewResolver views={views}>
              <Table dir={context.dir} density={context.density}>
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
                        typeof onRowClick === 'function' && !context.loading
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

export interface StatefulTableProps<T> extends SystemComponent {
  state: UseTableReturn<T>
  /**
   * Element that will be displayed on top of the table
   */
  children?: ReactNode
  /**
   * Object with the strings to display on each state
   */
  views?: TableViewsType
}
