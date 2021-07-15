import React, {
  useMemo,
  useCallback,
  ReactNode,
  PropsWithChildren,
  Fragment,
  useState,
} from 'react'
import { get } from '@vtex/admin-core'

import {
  resolveCell as unstableResolveCell,
  resolveHeader as unstableResolveHeader,
  Resolver,
  ResolverContext,
  ResolveCellArgs,
  ResolveHeaderArgs,
  ResolveHeaderReturn,
} from '../resolvers/core'
import { baseResolvers } from '../resolvers/base'
import { Column, DataGridDensity } from '../typings'
import { SelectionProvider } from '../resolvers/selection'
import {
  UseSortReturn,
  useDataGridSort,
  UseDataGridSortParams,
} from './useDataGridSort'
import { Status, SetStatus, StatusObject, useStatus } from './useStatus'

export function useDataGridState<T>(
  params: UseDataGridStateParams<T>,
  resolvers: Record<string, Resolver<T>> | undefined = baseResolvers<T>()
): DataGridState<T> {
  const {
    columns,
    length = 5,
    items = [],
    sort = {},
    getRowKey = (item: T) =>
      get((item as unknown) as Record<string, unknown>, 'id', ''),
    onRowClick,
    density: initialDensity = 'regular',
  } = params

  const [density, setDensity] = useState<DataGridDensity>(initialDensity)
  const { status, statusObject, setStatus } = useStatus()

  /**
   * resolver's context
   */
  const context: ResolverContext = useMemo(
    () => ({
      density,
      status,
      statusObject,
    }),
    [density, status, statusObject]
  )

  const sortState = useDataGridSort(sort)

  const skeletonCollection = useMemo<T[]>(() => {
    return Array(length)
      .fill(0)
      .map((_, id) => {
        const item = columns.reduce((acc, col) => {
          return { ...acc, [col.id]: '__table_skeleton__' }
        }, {})

        return ({ id, ...item } as unknown) as T
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, columns])

  const selectionColumn = useMemo(
    () => columns.find((col) => col.resolver?.type === 'selection'),
    [columns]
  )

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

  function Providers(props: PropsWithChildren<unknown>) {
    return selectionColumn ? (
      <SelectionProvider
        items={data}
        mapId={get(selectionColumn, 'resolver.mapId', () => '')}
        isSelected={get(selectionColumn, 'resolver.isSelected', () => false)}
        onSelect={get(selectionColumn, 'resolver.onSelect', () => null)}
      >
        {props.children}
      </SelectionProvider>
    ) : (
      <Fragment>{props.children}</Fragment>
    )
  }

  return {
    skeletonCollection,
    resolveCell,
    resolveHeader,
    data,
    columns,
    Providers,
    sortState,
    getRowKey,
    onRowClick,
    status,
    statusObject,
    setStatus,
    setDensity,
    density,
  }
}

export interface UseDataGridStateParams<T> {
  /**
   * Table column spec
   */
  columns: Array<Column<T>>
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
  sort?: UseDataGridSortParams<T>
  /**
   * Table row height
   * @default regular
   */
  density?: DataGridDensity
  /**
   * Action to dispatch on a row click
   */
  onRowClick?: (item: T) => void
}

export interface DataGridState<T> {
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
  columns: Array<Column<T>>
  /**
   * Providers from the resolvers
   */
  Providers: (props: PropsWithChildren<unknown>) => JSX.Element
  /**
   * Current sorting state
   */
  sortState: UseSortReturn
  /**
   * Key extractor
   */
  getRowKey: (item: T) => string | unknown
  /**
   * Current grid density
   */
  density: DataGridDensity
  /**
   * Set the current grid density
   */
  setDensity: React.Dispatch<DataGridDensity>
  /**
   * Action to take on click a row
   */
  onRowClick?: (item: T) => void
  /**
   * Current grid status
   */
  status: Status
  /**
   * Current grid status object (important for resolvers)
   */
  statusObject: StatusObject
  /**
   * set the current grid status
   */
  setStatus: SetStatus
}

/**
 * Caller of a resolver
 */
type ResolverCallee<T> = Omit<T, 'resolvers' | 'context' | 'sortState'>
