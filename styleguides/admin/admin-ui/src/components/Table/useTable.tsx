import React, {
  useMemo,
  useCallback,
  ReactNode,
  PropsWithChildren,
  Fragment,
} from 'react'
import { get } from '@vtex/admin-core'

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
import { SelectionProvider } from './resolvers/selection'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, columns])

  const selectionColumn = useMemo(
    () => columns.find((col) => col.resolver?.type === 'selection'),
    [columns]
  )

  const resolveCell = useCallback(
    (args: ResolverCallee<ResolveCellArgs<T>>) =>
      unstableResolveCell<T>({ ...args, resolvers, context }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resolvers, context]
  )

  const resolveHeader = useCallback(
    (args: ResolverCallee<ResolveHeaderArgs<T>>) =>
      unstableResolveHeader<T>({ ...args, resolvers, context }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resolvers, context]
  )

  const data = useMemo(() => (context.loading ? skeletonCollection : items), [
    items,
    context.loading,
    skeletonCollection,
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
  resolveHeader: (args: ResolverCallee<ResolveHeaderArgs<T>>) => ReactNode
  data: T[]
  columns: Array<Column<T>>
  Providers: (props: PropsWithChildren<unknown>) => JSX.Element
}

type ResolverCallee<T> = Omit<T, 'resolvers' | 'context'>
