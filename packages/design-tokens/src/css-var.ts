const TOKEN_PREFIX = '$'
const DS_PREFIX = 'sl'
const SPACE = ' '

/**
 * Returns wether a value is a string
 * @example
 * isString('') => true
 * isString(1) => false
 */
export function isString<T extends string = string>(
  value: unknown
): value is T {
  return typeof value === 'string'
}

/**
 * Returns wether a string is a token
 * @example
 * isToken('token') => false
 * isToken('$token') => true
 */
export function isToken(token: unknown): token is string {
  return isString(token) && token.startsWith(TOKEN_PREFIX)
}

/**
 * Cleans the token symbol from a string
 * @param {String} token String to clean
 * @returns {String} Clean string
 * @example
 * cleanTokenString('$token') // returns => 'token'
 * cleanTokenString('token') // returns => 'token'
 */
export function cleanTokenString(token: string): string {
  if (isToken(token)) {
    const sanitizedToken = String(token).trim()

    return sanitizedToken.substring(1)
  }

  return token
}

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
