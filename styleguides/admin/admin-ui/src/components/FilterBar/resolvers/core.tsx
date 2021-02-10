import React, { ReactNode } from 'react'
import { get } from '@vtex/admin-core'
import { StatementProps } from '../index'
import invariant from 'tiny-invariant'

/**
 * Used to recursive define resolver
 * @generic I: ID of the resolver
 */
export type ResolverShortcut<I, S = unknown> = S & { type: I }

export type ResolveFilterArgs<T> = {
  statement: StatementProps<T>
  resolvers: Record<string, Resolver>
  index: number
  handleValueChange: (value: T, index: number) => void
}

export function createResolver<T, I, S = Record<string, unknown>>(
  resolver: Resolver<T, I, S>
): Resolver<T, I, S> {
  return resolver
}

export interface Resolver<T = any, I = any, S = any> {
  value: (helpers: {
    /** current data extractor */
    getData?: CallableFunction
    /** current statement */
    statement: StatementProps<T, ResolverShortcut<I, S>>
    handleValueChange: (value: T, index: number) => void
    index: number
  }) => ReactNode
}

/**
 * Resolve current cell within a loop
 * @param column
 * @param item
 * @param resolvers
 */
export function resolveValue<T>(args: ResolveFilterArgs<T>) {
  const { resolvers, statement, index, handleValueChange } = args
  const id = get(statement.filter, 'resolver.type')

  invariant(id, 'resolver.type is required while using a filter')

  const { value } = resolvers[id]

  return value({ statement, index, handleValueChange })
}

/**
 * Render props of the resolver
 * @generic T: Type of statement value
 */
export type ResolverRenderProps<T, D> = {
  data: D
  statement: StatementProps<T>
  index: number
  handleValueChange: (value: T, index: number) => void
}

/** Default render of resolvers */
export function defaultRender({ data }: ResolverRenderProps<any, JSX.Element>) {
  return <React.Fragment>{data}</React.Fragment>
}
