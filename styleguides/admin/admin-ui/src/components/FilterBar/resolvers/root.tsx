import { ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createResolver, ResolverRenderProps } from './core'

export function rootResolver<T>() {
  return createResolver<T, 'root', RootResolver<T>>({
    value: function RootResolver({ statement, index, handleValueChange }) {
      const { filter } = statement

      const { resolver } = filter
      console.log('resolver root')
      invariant(resolver, 'resolver is required while using the root resolver')

      const render = resolver.render

      return render({ data: null, statement, index, handleValueChange })
    },
  })
}

export type RootResolver<T> = {
  type: 'root'
  render: (props: ResolverRenderProps<T, null>) => ReactNode
}
