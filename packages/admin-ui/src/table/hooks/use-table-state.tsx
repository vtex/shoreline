import type { ReactNode, RefObject } from 'react'
import { useMemo, useCallback } from 'react'
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
import { baseResolvers } from '../resolvers/base'
import type { TableColumn } from '../types'
import type { UseSortReturn, UseTableSortParams } from './use-table-sort'
import { useTableSort } from './use-table-sort'
import type { DataViewState } from '../../data-view'

export function useTableState<T>(
  params: UseTableStateParams<T>,
  resolvers: Record<string, Resolver<T>> | undefined = baseResolvers<T>()
): TableState<T> {
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

  return {
    skeletonCollection,
    resolveCell,
    resolveHeader,
    data,
    columns,
    sortState,
    getRowKey,
    onRowClick,
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

export interface TableState<T> {
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
  tableRef?: RefObject<HTMLTableElement>
}

/**
 * Caller of a resolver
 */
type ResolverCallee<T> = Omit<T, 'resolvers' | 'context' | 'sortState'>
