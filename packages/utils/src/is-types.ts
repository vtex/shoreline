import { constants } from './constants'
import type { AnyFunction } from './utility-types'

/**
 * Returns wether a value is a function
 * @example
 * isFunction(() => {}) // true
 */
export function isFunction<T extends AnyFunction = AnyFunction>(
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
