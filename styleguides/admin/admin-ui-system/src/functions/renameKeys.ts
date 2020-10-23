/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Rename keys within a object using a map as reference
 * @example
 * ```js
 * const keysMap = { a: 'b' }
 * const obj = { a: 'c', c: 'd' }
 *
 * renameKeys(keysMap, obj)
 * // returns { b: 'c', c: 'd' }
 * ```
 */
export function renameKeys(
  keysMap: { [x: string]: any },
  obj: { [x: string]: any }
) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  )
}
