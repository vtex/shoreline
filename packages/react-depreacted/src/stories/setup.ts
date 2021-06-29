import { createOnda } from '@vtex/onda-core'
import { standard } from '@vtex/onda-plugins'

import theme from './theme'

const [ThemeProvider] = createOnda({
  name: 'sb-onda',
  description: 'sb-onda description',
  plugins: standard,
  theme,
})

export { ThemeProvider }
