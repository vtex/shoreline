import { isToken } from './is-token'

/**
 * Clean the token symbol from a string
 * @param {String} token string to clean
 * @returns {String} clean string
 * @example
 * cleanTokenString('$token') // returns => 'token'
 * cleanTokenString('token') // returns => 'token'
 */
export function cleanTokenString(token: string): string {
  if (isToken(token)) {
    return token.substring(1)
  }

  return token
}
