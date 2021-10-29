import type { ThemeOptions } from './theme'
import { defaultTheme, createTheme } from './theme'
import { plugins } from './plugins'
import { createStyles } from './runtime'
import { buildPlugins } from './system'

const defaultOptions: ThemeOptions = {
  tokens: ['background', 'foreground', 'borderColor'],
  disableCSSVariables: true,
}

export function unstableCreateAdminUI<T extends Record<string, any>>(
  unparsedTheme: T,
  themeOptions: ThemeOptions = defaultOptions
) {
  const { theme, cssVariables } = createTheme(unparsedTheme, themeOptions)

  const steps = buildPlugins(theme, plugins)
  const styles = createStyles(steps, theme)
  const globalStyles = styles(theme.global)

  return {
    theme,
    cssVariables,
    styles,
    globalStyles,
    themeOptions,
  }
}

export const defaultSystemInstance = unstableCreateAdminUI(defaultTheme)

const { theme, cssVariables, styles, globalStyles } = defaultSystemInstance

export { theme, cssVariables, styles, globalStyles }
export type UnstableAdminUI = ReturnType<typeof unstableCreateAdminUI>
