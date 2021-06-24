/**
 * Capitalizes a string
 * @param str
 * @example
 * capitalize('string') // 'String'
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
