import type { ReactNode, RefObject } from 'react'
import { useRef, useMemo, useCallback } from 'react'
import { get } from '@vtex/admin-ui-util'

import type {
  ResolverContext,
  ResolveCellArgs,
  ResolveHeaderArgs,
  ResolveHeaderReturn,
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

export function useTableState<T extends {}>(
  params: UseTableStateParams<T>
): UseTableStateReturn<T> {
  const {
    columns,
    length = 5,
    items = [],
    sort = {},
    getRowKey = defaultGetRowKey,
    onRowClick,
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

  const isSelectable = useMemo(() => {
    return columns.some(
      (column) =>
        column?.resolver?.type === 'selection' ||
        column?.resolver?.type === 'bulk'
    )
  }, [columns])

  const getBodyRowState = useCallback(
    () => ({
      isSelectable,
      onRowClick,
      resolveCell,
      lastFixedColumn,
      tableRef,
      status,
    }),
    [onRowClick, resolveCell, lastFixedColumn, status, isSelectable]
  )

  const getHeadState = useCallback(
    () => ({
      resolveHeader,
      sortState,
      lastFixedColumn,
      tableRef,
    }),
    [resolveHeader, sortState, lastFixedColumn]
  )

  const getTableState = useCallback(
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
    getRowKey,
    getBodyRowState,
    getHeadState,
    getTableState,
    tableRef,
    status,
  }
}

function defaultGetRowKey<T>(item: T): string {
  return String(get(item as unknown as Record<string, unknown>, 'id', ''))
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
   * Key extractor
   * @default (item)=>item.id
   */
  getRowKey?: (item: T) => string
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
  /**
   * Action to dispatch on a row click
   */
  onRowClick?: (item: T) => void
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
   * Key extractor
   */
  getRowKey: (item: T) => string | unknown
  /**
   * Action to take on click a row
   */
  onRowClick?: (item: T) => void
  /**
   * Table ref
   */
  tableRef: RefObject<HTMLTableElement>
  getBodyRowState: () => TableBodyRowState<T>
  getHeadState: () => TableHeadState<T>
  getTableState: () => TableStateReturn
  status: DataViewStatus
}

export type TableState<T = any> = Omit<
  UseTableStateReturn<T>,
  'body' | 'bodyRow' | 'head'
>

/**
 * Caller of a resolver
 */
export type ResolverCallee<T> = Omit<T, 'resolvers' | 'context' | 'sortState'>

export interface TableBodyRowState<T> {
  onRowClick?: (item: T) => void
  status: DataViewStatus
  resolveCell: (args: ResolverCallee<ResolveCellArgs<T>>) => ReactNode
  lastFixedColumn?: TableColumn<T, BaseResolvers<T>>
  tableRef?: RefObject<HTMLTableElement>
  isSelectable: boolean
}

export interface TableStateReturn<T = any> {
  columns: Array<TableColumn<T, BaseResolvers<T>>>
  status: DataViewStatus
  tableRef?: RefObject<HTMLTableElement>
}

export interface TableHeadState<T> extends TableCellState<T> {
  resolveHeader: (
    args: ResolverCallee<ResolveHeaderArgs<T>>
  ) => ResolveHeaderReturn
  sortState: UseSortReturn
  tableRef?: RefObject<HTMLTableElement>
}

export interface TableCellState<T> {
  lastFixedColumn?: TableColumn<T, BaseResolvers<T>>
  tableRef?: RefObject<HTMLTableElement>
}
