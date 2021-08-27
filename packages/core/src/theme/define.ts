import { themeShape } from './shape'
import { createTheme } from './theme'
import { createParser } from '../runtime'
import { buildPlugins } from '../system'
import { plugins } from '../plugins'

const [theme, cssVariables] = createTheme(themeShape, {
  disableCSSVariables: true,
})

const steps = buildPlugins(theme, plugins)

export const parse = createParser(steps, theme)
export const globalStyles = parse(theme.global)
export { theme, cssVariables }
