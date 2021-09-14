import { createElement } from 'react'
import { createSystem, unstableCreateAdminUI } from '@vtex/admin-ui'
import theme from './theme'

const unstableSystem = unstableCreateAdminUI(theme)

const [ThemeProvider] = createSystem({
  key: 'gatsby-plugin-admin-ui',
  unstableSystem,
})

export function wrapRootElement(args) {
  const { element } = args

  return createElement(ThemeProvider, {}, element)
}
