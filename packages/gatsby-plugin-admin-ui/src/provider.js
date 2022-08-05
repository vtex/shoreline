import { createElement } from 'react'
import { ThemeProvider } from '@vtex/admin-ui'

export function wrapRootElement(args) {
  const { element } = args

  return createElement(ThemeProvider, {}, element)
}
