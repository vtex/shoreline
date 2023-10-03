import type { AnyObject, Dict } from './utility-types'
import { constants } from './constants'
import { cssVar } from './css-var'
import { flattenObject } from './object'

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

/**
 * Parse a prefix-value to a CSS Variable declaration
 * @param {string} value
 * @param {string} prefix
 */
function toVar(value: string, prefix: string = constants.dsPrefix) {
  return `--${prefix}-${value}`
}

interface ParseTokensProps {
  tokens: AnyObject
  unprefixed?: boolean
  prefix?: string
}
