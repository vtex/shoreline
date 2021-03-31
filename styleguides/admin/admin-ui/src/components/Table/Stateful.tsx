import React, { useMemo } from 'react'
import { get } from '@vtex/admin-core'

import { ResolverContext } from './resolvers/core'
import { TableDensity, TableDir } from './typings'
import { useTable, UseTableParams } from './useTable'
import { Table } from './components'
import { SystemComponent } from '../../types'
import { Box, Flex } from '@vtex/admin-primitives'
import { Pagination } from '../Pagination'

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
export function StatefulTable<T>(props: StatefulTableProps<T>) {
  const {
    columns,
    items = [],
    loading = false,
    getRowKey = (item: T) =>
      get((item as unknown) as Record<string, unknown>, 'id', ''),
    resolvers,
    density = 'regular',
    dir = 'ltr',
    csx,
    length = 5,
    onRowClick,
    manualPagination,
    paginationCallback,
    paginationReducer,
    paginationInitialState,
    totalAmountOfItems,
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
    pagination,
  } = useTable<T>({
    length,
    columns,
    resolvers,
    context,
    items,
    manualPagination,
    paginationCallback,
    paginationReducer,
    paginationInitialState,
    totalAmountOfItems,
  })

  return (
    <Providers>
      <Box csx={{ overflow: 'auto', width: 'full', ...csx }}>
        <Flex csx={{ marginBottom: '1.5rem' }}>
          {/* Later this box should be the Toolbar component */}

          <Flex.Spacer />
          <Pagination
            range={
              manualPagination
                ? manualPagination
                : pagination.paginationState.range
            }
            preposition="of"
            subject="results"
            prevLabel="Prev"
            nextLabel="Next"
            total={totalAmountOfItems ? totalAmountOfItems : items.length}
            loading={loading}
            onClickNext={() => pagination.paginate('next')}
            onClickPrev={() => pagination.paginate('prev')}
          />
        </Flex>
        <Table dir={context.dir} density={density}>
          <Table.Head>
            <Table.Row>
              {columns.map((column) => {
                const content = resolveHeader({ column, items: data })

                return (
                  <Table.Cell key={column.id as string} column={column}>
                    {content}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((item) => (
              <Table.Row
                key={getRowKey(item) as string}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
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
      </Box>
    </Providers>
  )
}

export interface StatefulTableProps<T>
  extends Omit<UseTableParams<T>, 'context'>,
    SystemComponent {
  /**
   * Key extractor
   * @default (item)=>item.id
   */
  getRowKey?: (item: T) => string
  /**
   * Whether the table is loading or not
   * @default false
   */
  loading?: boolean
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
}
