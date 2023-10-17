import { constants } from './constants'

/**
 * Returns wether a value is a function
 * @example
 * isFunction(() => {}) // true
 */
export function isFunction<T extends Function = Function>(
  value: any
): value is T {
  return typeof value === 'function'
}

/**
 * Returns wether a value is a string and is empty
 * @example
 * isStringEmpty('') => true
 * isStringEmpty(' ') => true
 */
export function isStringEmpty<T extends string = string>(
  value: unknown
): value is T {
  return isString(value) && value.trim() === constants.emptyString
}

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
