import { tokens } from './tokens'
import { createTheme } from './createTheme'
import { createCsx } from './styles'

const { theme, cssVariables } = createTheme(tokens)

const csx = createCsx(theme)

export { theme, cssVariables, csx }
