import type { AnyObject } from './types'

/**
 * Checks whether `prop` is an own property of `obj` or not.
 */
export function hasOwnProperty<T extends AnyObject>(
  object: T,
  prop: keyof any
): prop is keyof T {
  return Object.prototype.hasOwnProperty.call(object, prop)
}
