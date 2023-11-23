import type { AnyObject, Dict } from './utility-types'
import { constants } from './constants'
import { cssVar } from './css-var'
import { flattenObject } from './flatten-object'
import { toVar } from './to-var'

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
