import type { ReactNode, RefObject } from 'react'
import { useRef, useMemo, useCallback } from 'react'

import type {
  ResolverContext,
  ResolveCellArgs,
  ResolveHeaderArgs,
  ResolveHeaderReturn,
  ResolverCallee,
} from '../resolvers/resolver-core'
import {
  resolveCell as unstableResolveCell,
  resolveHeader as unstableResolveHeader,
} from '../resolvers/resolver-core'
import type { BaseResolvers } from '../resolvers/base'
import type { TableColumn } from '../types'
import type { UseSortReturn, UseTableSortParams } from './use-table-sort'
import { useTableSort } from './use-table-sort'
import type { DataViewStatus } from '../../data-view'
import { get } from '@vtex/admin-ui-util'

import type { TableProps } from '../components/table'
import type { TableHeadCellProps } from '../components/table-head/table-head-cell'
import type { TableBodyCellProps } from '../components/table-body/table-body-cell'

export function useTableState<T extends {}>(
  params: UseTableStateParams<T>
): UseTableStateReturn<T> {
  const {
    columns,
    length = 5,
    items = [],
    sort = {},
    status = 'ready',
  } = params

  const tableRef = useRef<HTMLTableElement>(null)

  const sortState = useTableSort(sort)

  const skeletonCollection = useMemo<T[]>(() => {
    return Array(length)
      .fill(0)
      .map((_, id) => {
        const item = columns.reduce((acc, col) => {
          return { ...acc, [col.id]: `__table_skeleton-${id}__` }
        }, {})

        return { id, ...item } as unknown as T
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, columns])

  const resolveCell = useCallback(
    (args: ResolverCallee<ResolveCellArgs<T>>) =>
      unstableResolveCell<T>({ ...args, context: status }),
    [status]
  )

  const resolveHeader = useCallback(
    (args: ResolverCallee<ResolveHeaderArgs<T>>) =>
      unstableResolveHeader<T>({
        ...args,
        context: status,
        sortState,
      }),
    [status, sortState]
  )

  const data = useMemo(() => {
    if (status === 'loading') {
      return skeletonCollection
    }

    if (sortState.by && sortState.order) {
      const column = columns.find((column) => column.id === sortState.by)

      if (column && column.compare) {
        const itemsCopy = items.slice()

        return itemsCopy.sort((a, b) => {
          if (column.compare) {
            return sortState.resolveSorting(column.compare(a, b))
          }

          return 0
        })
      }
    }

    return items
  }, [
    items,
    status,
    skeletonCollection,
    sortState.by,
    sortState.order,
    columns,
  ])

  const lastFixedColumn = useMemo(() => {
    const [column] = columns.filter((col) => !!col?.fixed).slice(-1)

    return column
  }, [])

  const getBodyCell = useCallback(
    (column: TableColumn<T, BaseResolvers<T>>, item: T) => ({
      column,
      item,
      resolveCell,
      lastFixedColumn,
      tableRef,
      status,
      key: `${String(column.id)}-${String(get(item, 'id'))}`,
    }),
    [resolveCell, lastFixedColumn, status]
  )

  const getHeadCell = useCallback(
    (column: TableColumn<T, BaseResolvers<T>>) => ({
      column,
      resolveHeader,
      sortState,
      lastFixedColumn,
      tableRef,
      key: String(column.id),
    }),
    [resolveHeader, sortState, lastFixedColumn]
  )

  const getTable = useCallback(
    () => ({
      columns,
      status,
      tableRef,
    }),
    [columns, status]
  ) as any

  return {
    skeletonCollection,
    resolveCell,
    resolveHeader,
    data,
    columns,
    sortState,
    getBodyCell,
    getHeadCell,
    getTable,
    tableRef,
    status,
  }
}

export interface UseTableStateParams<T> {
  /**
   * Table column spec
   */
  columns: Array<TableColumn<T>>
  /**
   * data-view state
   */
  status?: DataViewStatus
  /**
   * Resolver context
   */
  context?: ResolverContext
  /**
   * Table items
   * @default []
   */
  items?: T[]
  /**
   * Expected items length
   * @default 5
   */
  length?: number
  /**
   * Object used in sort hook
   */
  sort?: UseTableSortParams<T>
}

export interface UseTableStateReturn<T> {
  /**
   * Collection rendered while loading
   */
  skeletonCollection: T[]
  /**
   * Resolves the cell content
   */
  resolveCell: (args: ResolverCallee<ResolveCellArgs<T>>) => ReactNode
  /**
   * Resolvers the header content
   */
  resolveHeader: (
    args: ResolverCallee<ResolveHeaderArgs<T>>
  ) => ResolveHeaderReturn
  /**
   * Items to render
   */
  data: T[]
  /**
   * Grid columns
   */
  columns: Array<TableColumn<T>>
  /**
   * Current sorting state
   */
  sortState: UseSortReturn
  /**
   * Table ref
   */
  tableRef: RefObject<HTMLTableElement>
  getBodyCell: (
    column: TableColumn<T, BaseResolvers<T>>,
    item: T
  ) => TableBodyCellProps<T>
  getHeadCell: (
    column: TableColumn<T, BaseResolvers<T>>
  ) => TableHeadCellProps<T>
  getTable: () => TableProps<T>
  status: DataViewStatus
}
