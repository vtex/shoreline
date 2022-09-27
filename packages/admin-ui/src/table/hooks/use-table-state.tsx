import type { ReactNode, RefObject } from 'react'
import { useRef, useMemo, useCallback } from 'react'
import { get } from '@vtex/admin-ui-util'

import type {
  Resolver,
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
import { baseResolvers } from '../resolvers/base'
import type { TableColumn } from '../types'
import type { UseSortReturn, UseTableSortParams } from './use-table-sort'
import { useTableSort } from './use-table-sort'
import type { DataViewState } from '../../data-view'

export function useTableState<T>(
  params: UseTableStateParams<T>,
  resolvers: Record<string, Resolver<T>> | undefined = baseResolvers<T>()
): UseTableStateReturn<T> {
  const {
    columns,
    length = 5,
    items = [],
    sort = {},
    getRowKey = (item: T) =>
      get(item as unknown as Record<string, unknown>, 'id', ''),
    onRowClick,
    view = {
      status: 'ready',
      statusObject: {
        loading: false,
        empty: null,
        error: null,
        notFound: false,
      },
    },
  } = params

  const { status, statusObject } = view

  const tableRef = useRef<HTMLTableElement>(null)

  /**
   * resolver's context
   */
  const context: ResolverContext = useMemo(
    () => ({
      status,
      statusObject,
    }),
    [status, statusObject]
  )

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
      unstableResolveCell<T>({ ...args, resolvers, context }),
    [resolvers, context]
  )

  const resolveHeader = useCallback(
    (args: ResolverCallee<ResolveHeaderArgs<T>>) =>
      unstableResolveHeader<T>({
        ...args,
        resolvers,
        context,
        sortState,
      }),
    [resolvers, context, sortState]
  )

  const data = useMemo(() => {
    if (context.status === 'loading') {
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
    context.status,
    skeletonCollection,
    sortState.by,
    sortState.order,
    columns,
  ])

  const body: TableBodyState<T> = useMemo(
    () => ({ data, getRowKey }),
    [data, getRowKey]
  )

  const lastFixedColumn = useMemo(() => {
    const [column] = columns.filter((col) => !!col?.fixed).slice(-1)

    return column
  }, [columns])

  const cell: TableCellState<T> = useMemo(
    () => ({ lastFixedColumn, tableRef }),
    [lastFixedColumn, tableRef]
  )

  const bodyRow: TableBodyRowState<T> = useMemo(
    () => ({ onRowClick, columns, resolveCell, cell }),
    [onRowClick, columns, resolveCell, cell]
  )

  const head: TableHeadState<T> = useMemo(
    () => ({ columns, resolveHeader, sortState, data, cell }),
    [columns, resolveHeader, sortState, data, cell]
  )

  return {
    skeletonCollection,
    resolveCell,
    resolveHeader,
    data,
    columns,
    sortState,
    getRowKey,
    onRowClick,
    body,
    bodyRow,
    head,
    tableRef,
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
  view?: DataViewState
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
  body: TableBodyState
  bodyRow: TableBodyRowState
  head: TableHeadState
}

export type TableState<T> = Omit<
  UseTableStateReturn<T>,
  'body' | 'bodyRow' | 'head'
>

/**
 * Caller of a resolver
 */
export type ResolverCallee<T> = Omit<T, 'resolvers' | 'context' | 'sortState'>

export interface TableBodyRowState<T = any> {
  onRowClick?: (item: T) => void
  columns: Array<TableColumn<T, BaseResolvers<T>>>
  resolveCell: (args: ResolverCallee<ResolveCellArgs<T>>) => ReactNode
  tableRef?: RefObject<HTMLTableElement>
  cell: TableCellState
}

export interface TableBodyState<T = any> {
  data: T[]
  getRowKey: (item: T) => unknown
}

export interface TableHeadState<T = any> {
  columns: Array<TableColumn<T, BaseResolvers<T>>>
  data: T[]
  resolveHeader: (
    args: ResolverCallee<ResolveHeaderArgs<T>>
  ) => ResolveHeaderReturn
  sortState: UseSortReturn
  tableRef?: RefObject<HTMLTableElement>
  cell: TableCellState
}

export interface TableCellState<T = any> {
  lastFixedColumn?: TableColumn<T, BaseResolvers<T>>
  tableRef?: RefObject<HTMLTableElement>
}
