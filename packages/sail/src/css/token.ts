const TOKEN_PREFIX = '$'

/**
 * Returns wether a string is a token
 * @example
 * isToken('token') => false
 * isToken('$token') => true
 */
export function isToken(token: string) {
  return typeof token === 'string' && token.startsWith(TOKEN_PREFIX)
}

/**
 * Clean the token symbol from a string
 * @example
 * cleanTokenString('$token') => 'token'
 * cleanTokenString('token') => 'token'
 */
export function cleanTokenString(token: string): string {
  if (isToken(token)) {
    return token.substring(1)
  }

  return token
}
