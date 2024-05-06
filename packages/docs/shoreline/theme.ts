import { presetSunrise } from '@vtex/shoreline'
import { parseTokens } from '@vtex/shoreline-utils'

export const theme = parseTokens({
  tokens: presetSunrise?.tokens ?? {},
})

const tokens = Object.keys(theme)

export const variables = tokens.reduce((acc, token) => {
  acc[token.replace('$', '--sl-')] = theme[token]
  return acc
}, {})
