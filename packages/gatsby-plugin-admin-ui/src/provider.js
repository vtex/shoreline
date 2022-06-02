import { createElement } from 'react'
import { createSystem } from '@vtex/admin-ui'

import theme from './theme'

const [ThemeProvider] = createSystem({
  experimentalTheme: theme,
})

export function wrapRootElement(args) {
  const { element } = args

  return createElement(ThemeProvider, {}, element)
}
