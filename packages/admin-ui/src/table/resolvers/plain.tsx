import { csx } from '@vtex/admin-ui-core'
import type { ReactNode } from 'react'
import React from 'react'

import { Skeleton } from '../../skeleton'
import type { ResolverRenderProps } from './resolver-core'
import { createResolver, defaultRender } from './resolver-core'

export function plainResolver<T>() {
  return createResolver<T, 'plain', PlainResolver<T>>({
    cell: function PlainResolver({ getData, item, column, context }) {
      if (context === 'loading') {
        return <Skeleton className={csx({ height: 24 })} />
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
