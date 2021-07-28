import type { ReactNode } from 'react'
import React from 'react'
import invariant from 'tiny-invariant'

import { Skeleton } from '../../Skeleton'
import type { ResolverRenderProps } from './core'
import { createResolver, defaultRender } from './core'

export function currencyResolver<T>() {
  return createResolver<T, 'currency', CurrencyResolver<T>>({
    cell: function CurrencyResolver({ getData, item, column, context }) {
      if (context.status === 'loading') {
        return <Skeleton csx={{ height: 24 }} />
      }

      const { resolver } = column

      invariant(
        resolver,
        'Resolver prop is required while using the currency resolver'
      )

      const { locale, currency, render } = resolver

      const plainValue = getData()
      const asNumber = Number(plainValue)
      const data = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(asNumber)

      const renderContent = render ?? defaultRender

      return renderContent({ data, item, context })
    },
  })
}

export type CurrencyResolver<T> = {
  type: 'currency'
  locale: string
  currency: string
  render?: (props: ResolverRenderProps<string, T>) => ReactNode
}
