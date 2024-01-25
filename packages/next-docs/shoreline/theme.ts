import { presetArpoador } from '@vtex/shoreline-theme-arpoador'
import { parseTokens } from '@vtex/shoreline-utils'

export const theme = parseTokens({
  tokens: presetArpoador?.tokens ?? {},
})

const tokens = Object.keys(theme)

export const variables = tokens.reduce((acc, token) => {
  return { ...acc, [token.replace('$', '--sl-')]: theme[token] }
}, {})
