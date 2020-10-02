import { ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createResolver } from './core'

export function rootResolver<T>() {
  return createResolver<T, 'root', RootResolver<T>>({
    field: function RootResolver({ item, column }) {
      const { resolver } = column

      invariant(resolver, 'resolver is required')

      const { render } = resolver

      invariant(
        render,
        'The render function is mandatory while using the root resolver'
      )

      return render(item)
    },
  })
}

export type RootResolver<T> = {
  type: 'root'
  render: (item: T) => ReactNode
}
