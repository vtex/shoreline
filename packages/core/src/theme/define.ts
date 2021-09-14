import { themeShape as defaultTheme } from './shape'
import { createTheme } from './theme'
import { createParser } from '../runtime'
import { buildPlugins } from '../system'
import { plugins } from '../plugins'

export function unstableCreateAdminUI<ThemeShape extends Record<string, any>>(
  themeShape: ThemeShape
) {
  const [theme, cssVariables] = createTheme(themeShape, {
    disableCSSVariables: true,
  })

  const steps = buildPlugins(theme, plugins)

  const parse = createParser(steps, theme)
  const globalStyles = parse(theme.global)

  return {
    theme,
    cssVariables,
    parse,
    globalStyles,
  }
}

const { theme, cssVariables, parse, globalStyles } =
  unstableCreateAdminUI(defaultTheme)

export { theme, cssVariables, parse, globalStyles }
export type UnstableAdminUI = ReturnType<typeof unstableCreateAdminUI>
