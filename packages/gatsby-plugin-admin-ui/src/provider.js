import { createElement } from 'react'
import { createOnda } from '@vtex/admin-ui'

const [ThemeProvider] = createOnda({
  key: 'gatsby-plugin-admin-ui',
})

export function wrapRootElement(args) {
  const { element } = args

  return createElement(ThemeProvider, {}, element)
}
