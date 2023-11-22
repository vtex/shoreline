import { constants } from './constants'

/**
 * Parse a prefix-value to a CSS Variable declaration
 * @param {string} value
 * @param {string} prefix
 */
export function toVar(value: string, prefix: string = constants.dsPrefix) {
  return `--${prefix}-${value}`
}
