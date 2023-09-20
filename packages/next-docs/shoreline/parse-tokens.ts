import type { AnyObject, Dict } from '@vtex/shoreline-utils'
import { constants, cssVar, flattenObject } from '@vtex/shoreline-utils'

/**
 * Parse token from the config to a Token Dict.
 */
export function parseTokens(props: ParseTokensProps): Dict {
  const { tokens = {}, prefix = constants.dsPrefix } = props

  const flatTokens = flattenObject(tokens)
  const tokenDict: Dict = {}

  for (const key in flatTokens) {
    const token = flatTokens[key as keyof typeof flatTokens]

    const resultKey = `$${key}`

    tokenDict[resultKey] = cssVar({ token, deepSearch: true, prefix })
  }

  return tokenDict
}

interface ParseTokensProps {
  tokens?: AnyObject
  prefix?: string
}
