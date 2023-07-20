import { cleanTokenString } from './clean-token-string'
import { DS_PREFIX, SPACE } from './constants'
import { isToken } from './is-token'

/**
 * Returns a token as css variable
 */
export function cssVar(props: CssVarProps): string {
  const { token, deepSearch = false } = props

  if (!token || (typeof token === 'string' && token.trim() === '')) {
    return ''
  }

  if (deepSearch) {
    return cssVarDeep(token)
  }

  return tokenToVar(token)
}

function tokenToVar(token: string): string {
  if (!isToken(token)) {
    return token
  }

  return `var(--${DS_PREFIX}-${cleanTokenString(token)})`
}

function cssVarDeep(token: string): string {
  const tokenizedValues = token
    .trim()
    .split(SPACE)
    .map((value: string) => {
      return tokenToVar(value)
    })

  return tokenizedValues.join(SPACE)
}

interface CssVarProps {
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
