import { tokens } from './tokens'
import { createTheme } from './createTheme'

const { theme, cssVariables } = createTheme(tokens)

export { theme, cssVariables }
