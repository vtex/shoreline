// Any is allowed in this file. Its used to grant composability
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ReactNode, Fragment } from 'react'
import warning from 'tiny-warning'

import { Column } from '../typings'

/**
 * Used to recursive define resolver
 * @generic I: ID of the resolver
 */
export type ResolverShorcut<I, T = unknown> = T & { type: I }

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
  }) => ReactNode
  lead?: (helpers: { getData: Function }) => ReactNode
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

/**
 * Resolve current lead within a loop
 * @param column
 * @param resolvers
 */
export function resolveLead<T>(
  column: Column<T>,
  resolvers: Record<string, Resolver<T>>
) {
  const id = get<string>(column, 'resolver.type', 'plain')

  const { lead } = resolvers[id]

  return lead ? lead({ getData: () => accessLead(column) }) : accessLead(column)
}

/**
 * Resolve current field within a loop
 * @param column
 * @param item
 * @param resolvers
 */
export function resolveField<T>(
  column: Column<T>,
  item: T,
  resolvers: Record<string, Resolver<T>>
) {
  const id = get<string>(column, 'resolver.type', 'plain')
  const { field } = resolvers[id]

  return field({
    getData: () => accessField(column, item),
    item,
    column,
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
      const resolved = get(item, acessor, undefined)

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
export function defaultRender(data: any) {
  return <Fragment>{data}</Fragment>
}

/**
 * Extract a value from a path within a collection
 * @param collection target collection
 * @param path desired path separated by '.'
 * @param defaultValue value returned if path is not found
 */
function get<T>(
  collection: Record<string, any>,
  path: string,
  defaultValue: any
): T {
  return String(path)
    .split('.')
    .reduce((tokens, token) => {
      return (tokens as any)?.[token] ?? defaultValue
    }, collection as T)
}
