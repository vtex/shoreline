import { DS_PREFIX } from './constants'
import type { Foundation } from './types'

/**
 * Returns a token as css variable
 * @param {String} foundation
 * @param {String} token
 * @param {String} dsPrefix
 * @returns
 */
export function cssVar(
  foundation: Foundation,
  token: string,
  dsPrefix: string = DS_PREFIX
): string {
  if (!token) {
    return ''
  }

  if (!foundation || foundation.trim() === '') {
    return token
  }

  return `var(--${dsPrefix}-${foundation}-${token})`
}
