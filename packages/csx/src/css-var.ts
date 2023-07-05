import { cleanTokenString } from './clean-token-string'
import { DS_PREFIX, SPACE } from './constants'
import { isToken } from './is-token'
import type { Foundation } from './types'

/**
 * Returns a token as css variable
 */
export function cssVar(props: CssVarProps): string {
  const { foundation, token, deepSearch = false } = props

  if (!token || (typeof token === 'string' && token.trim() === '')) {
    return ''
  }

  if (deepSearch) {
    return cssVarDeep(foundation, token)
  }

  return cssVarFlat(foundation, token)
}

function cssVarFlat(foundation: Foundation, token: string): string {
  if (!isToken(token)) {
    return token
  }

  const cleanToken = cleanTokenString(token)

  return `var(--${DS_PREFIX}-${foundation}-${cleanToken})`
}

function cssVarDeep(prop: Foundation, token: string): string {
  const tokenizedValues = token
    .trim()
    .split(SPACE)
    .map((value: string) => {
      return cssVarFlat(prop, value)
    })

  return tokenizedValues.join(SPACE)
}

interface CssVarProps {
  /**
   * Foundation
   */
  foundation: Foundation
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
