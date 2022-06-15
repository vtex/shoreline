import { themeSections } from './themeSections'
import { createTheme } from './utils'

const { theme, cssVars } = createTheme(themeSections as any, {
  enableCSSVariables: true,
})

export { theme, cssVars }
