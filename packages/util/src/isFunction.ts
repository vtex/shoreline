/**
 * Whether a value is a function
 */
export function isFunction<T extends Function = Function>(
  value: any
): value is T {
  return typeof value === 'function'
}
