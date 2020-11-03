import React, { ReactNode } from 'react'

import { Skeleton } from '../../Skeleton'
import { createResolver, defaultRender, ResolverRenderProps } from './core'

export function plainResolver<T>() {
  return createResolver<T, 'plain', PlainResolver<T>>({
    cell: function PlainResolver({ getData, item, column, context }) {
      if (context.loading) {
        return <Skeleton styles={{ height: 24 }} />
      }

      const data = getData()
      const { resolver } = column
      const render = resolver?.render ?? defaultRender

      return render({ data, item, context })
    },
  })
}

export type PlainResolver<T> = {
  type: 'plain'
  render?: (props: ResolverRenderProps<ReactNode, T>) => ReactNode
}
