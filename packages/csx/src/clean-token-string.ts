import { isToken } from './is-token'

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
