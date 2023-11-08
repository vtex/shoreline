/**
 * Compares two values
 */
export function shallowEqual<T>(
  a: T[] | T,
  b: T[] | T,
  equals = (a: T | T[], b: T | T[]) => a === b
): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length && a.every((val, index) => equals(val, b[index]))
    )
  }

  return equals(a, b)
}
