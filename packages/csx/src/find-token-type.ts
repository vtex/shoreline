import type { TokenType, TokenTypeDictionary } from './types'
import { defaultTokenTypes } from './default-values'

/**
 * Find token type for css property
 * @param {String} prop Prop to look for
 * @param {Object} dictionary { [prop]: tokenType } Dict
 * @returns {String | undefined} Token Type
 */
export function findTokenType(
  prop: string,
  dictionary: TokenTypeDictionary = defaultTokenTypes
): TokenType | undefined {
  return dictionary[prop]
}
