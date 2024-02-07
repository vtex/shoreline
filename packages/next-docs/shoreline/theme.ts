import { presetSunrise } from '@vtex/shoreline-theme-sunrise'
import { parseTokens } from '@vtex/shoreline-utils'

export const theme = parseTokens({
  tokens: presetSunrise?.tokens ?? {},
})

const tokens = Object.keys(theme)

export const variables = tokens.reduce((acc, token) => {
  return { ...acc, [token.replace('$', '--sl-')]: theme[token] }
}, {})
