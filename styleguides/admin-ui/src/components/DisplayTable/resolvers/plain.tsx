import { ReactNode } from 'react'

import { createResolver, defaultRender } from './core'

export function plainResolver<T>() {
  return createResolver<T, 'plain', PlainResolver<T>>({
    field: function PlainResolver({ getData, item, column }) {
      const content = getData()
      const { resolver } = column

      const render = resolver?.render ?? defaultRender

      return render(content, item)
    },
  })
}

export type PlainResolver<T> = {
  type: 'plain'
  render?: (data: ReactNode, item: T) => ReactNode
}
