import { createElement } from 'react'
import { createOndaInstance } from '@vtex/admin-ui'

const ThemeProvider = createOndaInstance({
  name: 'gatsby-plugin-admin-ui',
})

export function wrapRootElement(args) {
  const { element } = args

  return createElement(ThemeProvider, {}, element)
}
