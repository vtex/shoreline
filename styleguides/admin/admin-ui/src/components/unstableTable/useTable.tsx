import { useMemo, useCallback, ReactNode } from 'react'

import {
  resolveCell as unstableResolveCell,
  resolveHeader as unstableResolveHeader,
  Resolver,
  ResolverContext,
  ResolveCellArgs,
  ResolveHeaderArgs,
} from './resolvers/core'
import { baseResolvers } from './resolvers/base'
import { Column } from './typings'

export function useTable<T>(params: UseTableParams<T>): UseTableReturn<T> {
  const {
    columns,
    resolvers = baseResolvers<T>(),
    context = {
      loading: false,
      density: 'regular',
      dir: 'ltr',
    },
    length = 5,
    items = [],
  } = params

  const skeletonCollection = useMemo<T[]>(() => {
    return [...Array(length).keys()].map((id) => {
      const item = columns.reduce((acc, col) => {
        return { ...acc, [col.id]: '__table_skeleton__' }
      }, {})

      return ({ id, ...item } as unknown) as T
    })
  }, [length, columns])

  const resolveCell = useCallback(
    (args: ResolverCallee<ResolveCellArgs<T>>) =>
      unstableResolveCell<T>({ ...args, resolvers, context }),
    [resolvers, context]
  )

  const resolveHeader = useCallback(
    (args: ResolverCallee<ResolveHeaderArgs<T>>) =>
      unstableResolveHeader<T>({ ...args, resolvers, context }),
    [resolvers, context]
  )

  const data = useMemo(() => (context.loading ? skeletonCollection : items), [
    items,
    context.loading,
    skeletonCollection,
  ])

  return {
    skeletonCollection,
    resolveCell,
    resolveHeader,
    data,
    columns,
  }
}

export interface UseTableParams<T> {
  /**
   * Table column spec
   */
  columns: Array<Column<T>>
  /**
   * Resolver context
   */
  context?: ResolverContext
  /**
   * Table field resolvers
   * @default {baseResolvers}
   */
  resolvers?: Record<string, Resolver<T>>
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
}

export interface UseTableReturn<T> {
  skeletonCollection: T[]
  resolveCell: (args: ResolverCallee<ResolveCellArgs<T>>) => ReactNode
  resolveHeader: (
    args: ResolverCallee<ResolveHeaderArgs<T>>
  ) => {} | null | undefined
  data: T[]
  columns: Array<Column<T>>
}

type ResolverCallee<T> = Omit<T, 'resolvers' | 'context'>
