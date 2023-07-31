import type { AnyObject, Dict } from '@vtex/shoreline-utils'
import { constants, cssVar, flattenObject } from '@vtex/shoreline-utils'

function toVar(value: string, prefix = constants.dsPrefix) {
  return `--${prefix}-${value}`
}

/**
 * Parse token from the config to a Token Dict.
 */
export function parseTokens(props: ParseTokensProps): Dict {
  const { tokens = {}, unprefixed = false, prefix = constants.dsPrefix } = props

  const flatTokens = flattenObject(tokens)
  const tokenDict: Dict = {}

  for (const key in flatTokens) {
    const token = flatTokens[key as keyof typeof flatTokens]

    const resultKey = unprefixed ? key : toVar(key, prefix)

    tokenDict[resultKey] = cssVar({ token, deepSearch: true, prefix })
  }

  return tokenDict
}

interface ParseTokensProps {
  tokens: AnyObject
  unprefixed?: boolean
  prefix?: string
}
