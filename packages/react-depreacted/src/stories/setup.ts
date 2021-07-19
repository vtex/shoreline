import { createOnda } from '@vtex/onda-core'

import theme from './theme'

const [ThemeProvider] = createOnda({
  name: 'sb-onda',
  description: 'sb-onda description',
  theme,
})

export { ThemeProvider }
