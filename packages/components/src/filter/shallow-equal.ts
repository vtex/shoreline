import { isString } from '@vtex/shoreline-utils'

export function shallowEqual<T>(
  a: T[] | T,
  b: T[] | T,
  equals = (a: T, b: T) => a === b
): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length && a.every((val, index) => equals(val, b[index]))
    )
  }

  if (isString(a) && isString(b)) {
    return equals(a, b)
  }

  return false
}
