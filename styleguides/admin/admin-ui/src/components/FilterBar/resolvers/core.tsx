import React, { ReactNode } from 'react'
import { get } from '@vtex/admin-core'
import { FilterStatement } from '../typings'
import invariant from 'tiny-invariant'
import { BaseResolvers } from './base'

/**
 * Used to recursive define resolver
 * @generic I: ID of the resolver
 */
export type ResolverShortcut<I, S = unknown> = S & { type: I }

export type ResolveFilterArgs<T> = {
  statement: FilterStatement<T>
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
    /** current statement */
    statement: FilterStatement<T, ResolverShortcut<I, S>>
    handleValueChange: (value: T, index: number) => void
    index: number
  }) => ReactNode
}

/**
 * Resolve current value
 * @param statement
 * @param resolvers
 * @param index
 * @param handleValueChange
 */
export function ResolvedValue<T>(args: ResolveFilterArgs<T>) {
  const { resolvers, statement, index, handleValueChange } = args
  const id = statement.filter.resolver.type

  invariant(id, 'resolver.type is required while using a filter')

  const resolver = get(resolvers, id) as Resolver<
    T,
    typeof id,
    BaseResolvers<T>
  >

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
export type ResolverRenderProps<T, D> = {
  data: D
  statement: FilterStatement<T>
  index: number
  handleValueChange: (value: T, index: number) => void
}

/** Default render of resolvers */
export function defaultRender({ data }: ResolverRenderProps<any, ReactNode>) {
  return <React.Fragment>{data}</React.Fragment>
}
