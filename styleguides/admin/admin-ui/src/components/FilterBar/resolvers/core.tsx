import React, { ReactNode } from 'react'
import { get } from '@vtex/admin-core'
import { Statement } from '../typings'
import invariant from 'tiny-invariant'
import { BaseResolvers } from './base'

/**
 * Used to define resolver recursively
 * @generic I: ID of the resolver
 */
export type ResolverShortcut<I, S = unknown> = S & { type: I }

export interface Resolver<T, V extends { value: T }, I = any, S = any> {
  value: (helpers: {
    /** Current statement */
    statement: Statement<T, V, ResolverShortcut<I, S>>
    /** Handles the state of statement value */
    handleValueChange: (value: V, index: number) => void
    /** Current statement index on Statements array */
    index: number
  }) => ReactNode
}

export function createResolver<
  T,
  V extends { value: T },
  I,
  S = Record<string, unknown>
>(resolver: Resolver<T, V, I, S>): Resolver<T, V, I, S> {
  return resolver
}

export type ResolveFilterArgs<T, V extends { value: T }> = {
  /** Current statement */
  statement: Statement<T, V>
  /** FilterBar resolvers */
  resolvers: Record<string, Resolver<T, V>>
  /** Current statement index on Statements array */
  index: number
  /** Handles the state of statement value */
  handleValueChange: (value: V, index: number) => void
}

/**
 * Resolve current statement value
 * @param statement
 * @param resolvers
 * @param index
 * @param handleValueChange
 */
export function ResolvedValue<T, V extends { value: T }>(
  args: ResolveFilterArgs<T, V>
) {
  const { resolvers, statement, index, handleValueChange } = args
  const id = statement.filter.resolver.type

  invariant(id, 'resolver.type is required while using a filter')

  const resolver: Resolver<T, V, typeof id, BaseResolvers<T, V>> = get(
    resolvers,
    id
  )

  invariant(
    resolver,
    `The returned resolver is undefined. Make sure that you are using a valid resolver type. Resolver type: ${id}`
  )

  const { value } = resolver

  const data = value({ statement, index, handleValueChange }) as JSX.Element

  return <React.Fragment>{data}</React.Fragment>
}

/**
 * Render props of the resolver
 * @generic T: Type of statement value
 * @generic D: Type of data
 */
export type ResolverRenderProps<T, V extends { value: T }, D = null> = {
  data: D
  statement: Statement<T, V>
  index: number
  handleValueChange: (value: V, index: number) => void
}

/** Default render of resolvers */
export function defaultRender<T, V extends { value: T }>({
  data,
}: ResolverRenderProps<T, V, ReactNode>) {
  return <React.Fragment>{data}</React.Fragment>
}
