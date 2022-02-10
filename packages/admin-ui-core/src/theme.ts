import { tokens } from './tokens'
import type { ThemeOptions } from './createTheme'
import { createTheme } from './createTheme'

const themeOptions: ThemeOptions = {
  enableModes: false,
}

const { theme, cssVariables, rootStyleObject, rootStyleString } = createTheme(
  tokens,
  themeOptions
)

export { theme, cssVariables, rootStyleObject, rootStyleString }
