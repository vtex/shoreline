import { ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createResolver, defaultRender } from './core'

export function currencyResolver<T>() {
  return createResolver<T, 'currency', CurrencyResolver<T>>({
    field: function CurrencyResolver({ getData, item, column }) {
      const { resolver } = column

      invariant(resolver, 'Resolver prop is required')

      const { locale, currency, render } = resolver

      const plainValue = getData()
      const asNumber = Number(plainValue)
      const content = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(asNumber)

      const renderContent = render ?? defaultRender

      return renderContent(content, item)
    },
  })
}

export type CurrencyResolver<T> = {
  type: 'currency'
  locale: string
  currency: string
  render?: (currency: string, item: T) => ReactNode
}
