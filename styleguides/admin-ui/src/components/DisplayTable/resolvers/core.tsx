// Any is allowed in this file. Its used to grant composability
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ReactNode, Fragment } from 'react'
import warning from 'tiny-warning'
import { get } from '@vtex-components/theme'

import { Column } from '../typings'
import { TableDensity, TableDir } from '..'

/**
 * Used to recursive define resolver
 * @generic I: ID of the resolver
 */
export type ResolverShorcut<I, T = unknown> = T & { type: I }

/**
 * Table context
 */
export type ResolverContext = {
  /**
   * HTML Dir
   */
  dir: TableDir
  /**
   * Table current density
   */
  density: TableDensity
  /**
   * If is loading or not
   */
  loading: boolean
}

/**
 * Render props of the resolver
 * @generic D: Type of returned data
 * @generic T: Type of returned item
 */
export type ResolverRenderProps<D, T> = {
  data: D
  item: T
  context: ResolverContext
}

/**
 * Fields resolver
 * @generic T: Type of the item
 * @generic I: ID of the resolver
 * @generic S: Aditional resolver specs
 */
export interface Resolver<T = any, I = any, S = any> {
  field: (helpers: {
    /** current data extractor */
    getData: Function
    /** current item */
    item: T
    /** current column */
    column: Column<T, ResolverShorcut<I, S>>
    /** field context */
    context: ResolverContext
  }) => ReactNode
  lead?: (helpers: { getData: Function; context: ResolverContext }) => ReactNode
}

/**
 * Function used to define resolvers correctly
 * @generic T: Type of the item
 * @generic I: ID of the resolver
 * @generic S: Aditional resolver specs
 * @param {Resolver} resolver resolver definition
 */
export function createResolver<T, I, S = {}>(
  resolver: Resolver<T, I, S>
): Resolver<T, I, S> {
  return resolver
}

type ResolveLeadArgs<T> = {
  column: Column<T>
  resolvers: Record<string, Resolver<T>>
  context: ResolverContext
}

/**
 * Resolve current lead within a loop
 * @param column
 * @param resolvers
 */
export function resolveLead<T>(args: ResolveLeadArgs<T>) {
  const { column, resolvers, context } = args

  const id = get(column, 'resolver.type', 'plain')

  const { lead } = resolvers[id]

  return lead
    ? lead({ getData: () => accessLead(column), context })
    : accessLead(column)
}

type ResolveFieldArgs<T> = {
  column: Column<T>
  item: T
  resolvers: Record<string, Resolver<T>>
  context: ResolverContext
}

/**
 * Resolve current field within a loop
 * @param column
 * @param item
 * @param resolvers
 */
export function resolveField<T>(args: ResolveFieldArgs<T>) {
  const { column, item, resolvers, context } = args
  const id = get(column, 'resolver.type', 'plain')
  const { field } = resolvers[id]

  return field({
    getData: () => accessField(column, item),
    item,
    column,
    context,
  })
}

/**
 * Call the lead of column
 * @param column current column
 */
function accessLead<T>(column: Column<T>) {
  const { lead } = column

  switch (typeof lead) {
    case 'string': {
      return lead
    }

    case 'function': {
      return lead(column)
    }

    default: {
      return null
    }
  }
}

/**
 * Call the acessor of fields
 * @param column current column
 * @param item current item
 */
function accessField<T>(column: Column<T>, item: T) {
  const { acessor } = column

  switch (typeof acessor) {
    case 'string': {
      const resolved = get((item as unknown) as object, acessor, undefined)

      warning(
        resolved,
        `The data is undefined. Make sure that you are using the correct resolver/acessor for the field: ${column.id}`
      )

      return resolved
    }

    case 'function': {
      return acessor(item)
    }

    default: {
      const castItem = item as Record<string, any>
      const resolved = get(castItem, column.id as string, undefined)

      warning(
        resolved !== undefined,
        `The data is undefined. Make sure that you are using the correct resolver/acessor for the field: ${column.id}`
      )

      return resolved ?? ''
    }
  }
}

/** Default render of resolvers */
export function defaultRender({ data }: ResolverRenderProps<any, any>) {
  return <Fragment>{data}</Fragment>
}
