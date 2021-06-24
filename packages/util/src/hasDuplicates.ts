/**
 * Return true if an array has duplicated elements
 * @param array
 * @example
 * hasDuplicates([1, 2, 3]) // false
 * hasDuplicates([1, 1, 0]) // true
 */
export function hasDuplicates<T>(array: T[]) {
  return new Set(array).size !== array.length
}
