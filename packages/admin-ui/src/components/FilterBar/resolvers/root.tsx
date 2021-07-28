import type { ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createResolver } from './core'
import type { ResolverRenderProps } from './core'

/**
 * Resolver that renders a specific component.
 *
 * @example
 *
 * resolver: {
 *   type: 'root',
 *   defaultValue,
 *   render: ({ handleValueChange, statement, index }) => {
 *     return <Component />
 *   }
 * }
 */
export function rootResolver<T>() {
  return createResolver<T, 'root', RootResolver<T>>({
    value: function RootResolver({ statement, index, handleValueChange }) {
      const { filter } = statement

      const { resolver } = filter

      invariant(
        resolver,
        'Resolver is required while using the root resolver on FilterBar'
      )

      const { render } = resolver

      return render({
        data: null,
        statement,
        index,
        handleValueChange,
      })
    },
  })
}

export type RootResolver<T> = {
  type: 'root'
  defaultValue: T
  render: (props: ResolverRenderProps<T>) => ReactNode
}
