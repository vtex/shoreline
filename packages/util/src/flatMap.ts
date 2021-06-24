/**
 * flat map implementation
 * @link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 * @param array
 * @param callbackfn
 * @returns
 * @example
 * flatMap([[1, 2], [3, 4]], n => n) //[1, 2, 3, 4]
 * flatMap([[1, 2], [3, 4]], n => n * 2) //[2, 4, 6, 8]
 */
export function flatMap<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  return [].concat(...(array.map(callbackfn) as any))
}
