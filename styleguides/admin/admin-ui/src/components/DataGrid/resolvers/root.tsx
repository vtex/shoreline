import { ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createResolver, ResolverRenderProps } from './core'

export function rootResolver<T>() {
  return createResolver<T, 'root', RootResolver<T>>({
    cell: function RootResolver({ item, column, context }) {
      const { resolver } = column

      invariant(resolver, 'resolver is required while using the root resolver')

      const { render } = resolver

      invariant(
        render,
        'The render function is mandatory while using the root resolver'
      )

      return render({ data: null, item, context })
    },
  })
}

export type RootResolver<T> = {
  type: 'root'
  /**
   * render function
   */
  render: (props: ResolverRenderProps<null, T>) => ReactNode
}
