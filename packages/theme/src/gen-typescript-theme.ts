import { parseTokens } from './parse-tokens'
import type { ShorelineConfig } from './config'
import { constants } from '@vtex/shoreline-utils'
import { format } from 'prettier'

/**
 * Generate tokens typescript code from configuration
 * @param config Shoreline configuration
 * @returns A Buffer with the typescript code.
 */
export async function genTypescriptTheme(config: ShorelineConfig) {
  const templateLiterals = getTemplateLiterals(config)
  const tsCode = `export const theme = { ${templateLiterals} };`

  const tsFormatted = await format(tsCode, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  return Buffer.from(tsFormatted)
}

function getTemplateLiterals(config: ShorelineConfig) {
  const { tokens = {}, prefix } = config

  let returnString = ''
  const unprefixedTokens = parseTokens({
    tokens,
    prefix,
    unprefixed: true,
  })

  for (const key in unprefixedTokens) {
    returnString += `'${constants.tokenPrefix}${key}': '${unprefixedTokens[key]}',`
  }

  return returnString.slice(0, -1).trim()
}
