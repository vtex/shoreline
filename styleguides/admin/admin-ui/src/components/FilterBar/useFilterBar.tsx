import React, {
  useMemo,
  useCallback,
  ReactNode,
  PropsWithChildren,
  Fragment,
} from 'react'
import { get } from '@vtex/admin-core'
import {
  ResolveFilterArgs,
  Resolver,
  resolveValue as unstableResolveValue,
} from './resolvers/core'
import { baseResolvers } from './resolvers/base'

export function useFilterBar<T>(params: FilterBarParams<T>) {
  const { resolvers = baseResolvers<T>() } = params

  const resolveValue = useCallback(
    (args: ResolverCallee<ResolveFilterArgs<T>>) =>
      unstableResolveValue<T>({ ...args, resolvers }),
    [resolvers]
  )

  return { resolveValue }
}

export interface FilterBarParams<T> {
  /**
   * Filters resolvers
   * @default {baseResolvers}
   */
  resolvers?: Record<string, Resolver<T>>
}

type ResolverCallee<T> = Omit<T, 'resolvers'>
