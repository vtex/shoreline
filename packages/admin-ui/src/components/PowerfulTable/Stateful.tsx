import React, { ReactNode } from 'react'
import { Box, Flex } from '@vtex/admin-primitives'

import { UseTableStateReturn } from '../Table/useTableState'
import { Table } from '../Table/components'
import { SystemComponent } from '../../types'
import { TableToolbar } from './components/Toolbar'
import { TableSection } from './components/Section'
import { TableSearch } from './components/Search'
import { SortIndicator } from '../Table/components/SortIndicator'
import { TableViewResolver, TableViewsType } from './components/Views'
import { ViewContext } from '../Table/context'
import { TableFilterBar } from './components/FilterBar'

/**
 * Table used to show static & simple information
 * @example
 * ```jsx
 * import { StatelessTable, useTableState, defineColumns } from `@vtex/admin-ui`
 *
 * type Item = {}
 *
 * const items: Item[] = []
 *
 * const columns = [
 *  {
 *    id: 'prop-to-access',
 *    lead: 'column-lead-text',
 *    width: ['...responsive-width'] | 'width'
 *    resolver: one of BaseResolvers<Item>
 *  },
 *  ...
 * ]
 *
 * const state = useTableState({ columns, items })
 *
 * <StatelessTable state={state} />
 * ```
 */

function _StatelessTable<T>(props: StatelessTableProps<T>) {
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

export const StatelessTable = Object.assign(_StatelessTable, {
  Toolbar: TableToolbar,
  Section: TableSection,
  Search: TableSearch,
  FilterBar: TableFilterBar,
})

export interface StatelessTableProps<T> extends SystemComponent {
  state: UseTableStateReturn<T>
  /**
   * Element that will be displayed on top of the table
   */
  children?: ReactNode
  /**
   * Object with the strings to display on each state
   */
  views?: TableViewsType
}
