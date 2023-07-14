import { cleanTokenString } from './clean-token-string'
import { DS_PREFIX, SPACE } from './constants'
import { isToken } from './is-token'
import type { TokenType } from './types'

/**
 * Returns a token as css variable
 */
export function cssVar(props: CssVarProps): string {
  const { tokenType, token, deepSearch = false } = props

  if (!token || (typeof token === 'string' && token.trim() === '')) {
    return ''
  }

  if (deepSearch) {
    return cssVarDeep(tokenType, token)
  }

  return cssVarFlat(tokenType, token)
}

function cssVarFlat(tokenType: TokenType, token: string): string {
  if (!isToken(token)) {
    return token
  }

  const cleanToken = cleanTokenString(token)

  return `var(--${DS_PREFIX}-${tokenType}-${cleanToken})`
}

function cssVarDeep(tokenType: TokenType, token: string): string {
  const tokenizedValues = token
    .trim()
    .split(SPACE)
    .map((value: string) => {
      return cssVarFlat(tokenType, value)
    })

  return tokenizedValues.join(SPACE)
}

interface CssVarProps {
  /**
   * Foundation
   */
  tokenType: TokenType
  /**
   * Value of the foundation
   */
  token: string
  /**
   * Search for the entire string
   * @default false
   */
  deepSearch?: boolean
}
