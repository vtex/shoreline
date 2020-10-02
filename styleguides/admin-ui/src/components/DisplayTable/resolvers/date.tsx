import { ReactNode } from 'react'
import invariant from 'tiny-invariant'

import { createResolver, defaultRender } from './core'

export function dateResolver<T>() {
  return createResolver<T, 'date', DateResolver<T>>({
    field: function DateResolver({ getData, item, column }) {
      const { resolver } = column

      invariant(resolver, 'resolver is required')

      const { locale, options, render } = resolver

      const dateString = getData()
      const asDate = new Date(dateString)
      const content = new Intl.DateTimeFormat(locale, options).format(asDate)

      const renderContent = render ?? defaultRender

      return renderContent(content, item)
    },
  })
}

export type DateResolver<T> = {
  type: 'date'
  locale: string
  options?: Intl.DateTimeFormatOptions
  render?: (date: string, item: T) => ReactNode
}
