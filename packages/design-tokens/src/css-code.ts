import { tokens } from './tokens'
import { transformTokens } from './transform-tokens'
import { renderCSS } from './render-css'

const theme = transformTokens(tokens)

export const cssCode = renderCSS(theme)
