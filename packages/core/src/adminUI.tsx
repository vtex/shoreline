import { themeShape as defaultTheme, createTheme } from './theme'
import { plugins } from './plugins'
import { createStyles } from './runtime'
import { buildPlugins } from './system'

export function unstableCreateAdminUI<T extends Record<string, any>>(
  unparsedTheme: T
) {
  const [theme, cssVariables] = createTheme(unparsedTheme, {
    disableCSSVariables: true,
  })

  const steps = buildPlugins(theme, plugins)
  const styles = createStyles(steps, theme)
  const globalStyles = styles(theme.global)

  return {
    theme,
    cssVariables,
    styles,
    globalStyles,
  }
}

const { theme, cssVariables, styles, globalStyles } =
  unstableCreateAdminUI(defaultTheme)

export { theme, cssVariables, styles, globalStyles }
export type UnstableAdminUI = ReturnType<typeof unstableCreateAdminUI>
