import { presetAdmin } from '@vtex/shoreline-preset-admin'
import { parseTokens } from './parse-tokens'

export const theme = parseTokens({
  tokens: presetAdmin.tokens,
})

const tokens = Object.keys(theme)

export const variables = tokens.reduce((acc, token) => {
  return { ...acc, [token.replace('$', '--sl-')]: theme[token] }
}, {})
