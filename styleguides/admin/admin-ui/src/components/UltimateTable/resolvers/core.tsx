// Any is allowed in this file. Its used to grant composability
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ReactNode, Fragment } from 'react'
import warning from 'tiny-warning'
import { get } from '@vtex/admin-core'

import { Column, TableDensity } from '../typings'
import { SortOrder, SortState } from '../hooks/useTableSort'

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
   * Table current density
   */
  density: TableDensity
  /**
   * If is loading or not
   */
  loading: boolean
  /**
   * If there's a error related to the table
   */
  error?: boolean
  /**
   * If a search in the table returned no items
   */
  itemsNotFound?: boolean
  /**
   * If the collection has no items
   */
  empty?: boolean
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
  cell: (helpers: {
    /** current data extractor */
    getData: CallableFunction
    /** current item */
    item: T
    /** current column */
    column: Column<T, ResolverShorcut<I, S>>
    /** cell context */
    context: ResolverContext
  }) => ReactNode
  header?: (helpers: {
    getData: CallableFunction
    context: ResolverContext
    items: T[]
    column: Column<T, ResolverShorcut<I, S>>
  }) => ReactNode
}

/**
 * Function used to define resolvers correctly
 * @generic T: Type of the item
 * @generic I: ID of the resolver
 * @generic S: Aditional resolver specs
 * @param {Resolver} resolver resolver definition
 */
export function createResolver<T, I, S = Record<string, unknown>>(
  resolver: Resolver<T, I, S>
): Resolver<T, I, S> {
  return resolver
}

export type ResolveHeaderArgs<T> = {
  column: Column<T>
  resolvers: Record<string, Resolver<T>>
  context: ResolverContext
  items: T[]
  sortState?: SortState
}

export type ResolveHeaderReturn = {
  isSortable: boolean
  content: ReactNode
  sortDirection?: SortOrder | null
}

/**
 * Resolve current header within a loop
 * @param column
 * @param resolvers
 */
export function resolveHeader<T>(
  args: ResolveHeaderArgs<T>
): ResolveHeaderReturn {
  const { column, resolvers, context, items, sortState = {} } = args

  const id = get(column, 'resolver.type', 'plain')

  const { header } = resolvers[id]

  const isSortable =
    (Boolean(column.compare) || Boolean(column.sortable)) && !context.loading

  const sortDirection = sortState.by === column.id ? sortState.order : null

  const content = header
    ? header({
        getData: () => accessHeader(column),
        context,
        items,
        column,
      })
    : accessHeader(column)

  return { content, isSortable, sortDirection }
}

export type ResolveCellArgs<T> = {
  column: Column<T>
  item: T
  resolvers: Record<string, Resolver<T>>
  context: ResolverContext
}

/**
 * Resolve current cell within a loop
 * @param column
 * @param item
 * @param resolvers
 */
export function resolveCell<T>(args: ResolveCellArgs<T>) {
  const { column, item, resolvers, context } = args
  const id = get(column, 'resolver.type', 'plain')
  const { cell } = resolvers[id]

  return cell({
    getData: () => accessCell(column, item),
    item,
    column,
    context,
  })
}

/**
 * Call the column header
 * @param column current column
 */
export function accessHeader<T>(column: Column<T>) {
  const { header } = column

  switch (typeof header) {
    case 'string': {
      return header
    }

    case 'function': {
      return header(column)
    }

    default: {
      return null
    }
  }
}

/**
 * Call the acessor of cells
 * @param column current column
 * @param item current item
 */
export function accessCell<T>(column: Column<T>, item: T) {
  const { acessor } = column

  switch (typeof acessor) {
    case 'string': {
      const resolved = get(
        (item as unknown) as Record<string, unknown>,
        acessor,
        undefined
      )

      warning(
        resolved,
        `The data is undefined. Make sure that you are using the correct resolver/acessor for the cell: ${column.id}`
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
        `The data is undefined. Make sure that you are using the correct resolver/acessor for the cell: ${column.id}`
      )

      return resolved ?? ''
    }
  }
}

/** Default render of resolvers */
export function defaultRender({ data }: ResolverRenderProps<any, any>) {
  return <Fragment>{data}</Fragment>
}
