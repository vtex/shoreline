import { csx } from '@vtex/admin-ui-core'
import type { ReactNode } from 'react'
import React from 'react'
import invariant from 'tiny-invariant'

import { Skeleton } from '../../skeleton'
import type { ResolverRenderProps } from './resolver-core'
import { createResolver, defaultRender } from './resolver-core'

export function dateResolver<T>() {
  return createResolver<T, 'date', DateResolver<T>>({
    cell: function DateResolver({ getData, item, column, context }) {
      if (context === 'loading') {
        return <Skeleton className={csx({ height: '1.5rem' })} />
      }

      const { resolver } = column

      invariant(resolver, 'resolver is required while using the date resolver')

      const { locale, options, render } = resolver

      const dateString = getData()
      const asDate = new Date(dateString)
      const data = new Intl.DateTimeFormat(locale, options).format(asDate)

      const renderContent = render ?? defaultRender

      return renderContent({ data, item, context })
    },
  })
}

export type DateResolver<T> = {
  type: 'date'
  locale: string
  options?: Intl.DateTimeFormatOptions
  render?: (props: ResolverRenderProps<string, T>) => ReactNode
}
