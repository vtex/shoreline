import { createElement } from 'react'
import { createSystem } from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  key: 'gatsby-plugin-admin-ui',
})

export function wrapRootElement(args) {
  const { element } = args

  return createElement(ThemeProvider, {}, element)
}
