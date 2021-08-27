import type { ReactNode } from 'react'
import React from 'react'
import { get } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'

import type { Statement } from '../typings'
import type { BaseResolvers } from './base'

/**
 * Used to define resolver recursively
 * @generic I: ID of the resolver
 */
export type ResolverShortcut<I, S = unknown> = S & { type: I }

export interface Resolver<T, I = any, S = any> {
  value: (helpers: {
    /** Current statement */
    statement: Statement<T, ResolverShortcut<I, S>>
    /** Handles the state of statement value */
    handleValueChange: (value: T, index: number) => void
    /** Current statement index on Statements array */
    index: number
  }) => ReactNode
}

export function createResolver<T, I, S = Record<string, unknown>>(
  resolver: Resolver<T, I, S>
): Resolver<T, I, S> {
  return resolver
}

export type ResolveFilterArgs<T> = {
  /** Current statement */
  statement: Statement<T>
  /** FilterBar resolvers */
  resolvers: Record<string, Resolver<T>>
  /** Current statement index on Statements array */
  index: number
  /** Handles the state of statement value */
  handleValueChange: (value: T, index: number) => void
}

/**
 * Resolve current statement value
 * @param statement
 * @param resolvers
 * @param index
 * @param handleValueChange
 */
export function ResolvedValue<T>(args: ResolveFilterArgs<T>) {
  const { resolvers, statement, index, handleValueChange } = args
  const id = statement.filter.resolver.type

  invariant(id, 'resolver.type is required while using a filter')

  const resolver: Resolver<T, typeof id, BaseResolvers<T>> = get(resolvers, id)

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
export type ResolverRenderProps<T, D = null> = {
  data: D
  statement: Statement<T>
  index: number
  handleValueChange: (value: T, index: number) => void
}

/** Default render of resolvers */
export function defaultRender<T>({ data }: ResolverRenderProps<T, ReactNode>) {
  return <React.Fragment>{data}</React.Fragment>
}
