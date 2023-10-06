import { isFunction } from './is-types'
import type { AnyFunction } from './utility-types'

/**
 * Receives functions as arguments and returns a new function that calls all.
 * @example
 * const fnX = () => {}
 * const fnY = () => {}
 * const fnXY = chain(fnx, fnY)
 * fnXY() // same as fnX() fnY()
 */
export function chain<T>(...fns: T[]) {
  return (...args: T extends AnyFunction ? Parameters<T> : never) => {
    for (const fn of fns) {
      if (isFunction(fn)) {
        fn(...(args as any))
      }
    }
  }
}
