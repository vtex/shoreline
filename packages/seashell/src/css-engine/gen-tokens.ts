import { constants, cssVar, flattenObject } from '@vtex/shoreline-utils'

const toVar = (value: string) => `--${constants.dsPrefix}-${value}`

type TokenDict = Record<string, string>

/**
 * Generate a token dict from a tokenConfig
 */
export function genTokens(
  config: Record<string, any>,
  unprefixed = false
): TokenDict {
  const tokens = flattenObject(config)
  const tokenDict: TokenDict = {}

  for (const key in tokens) {
    const token = tokens[key as keyof typeof tokens]

    const resultKey = unprefixed ? key : toVar(key)

    tokenDict[resultKey] = cssVar({ token, deepSearch: true })
  }

  return tokenDict
}
