/**
 * Returns true if propName is a handler
 * @example
 * isNativeHandler('onChange') // true
 * isNativeHandler('handleChange') // false
 */
export function isNativeHandler(propName: string): boolean {
  return (
    propName[0] === 'o' &&
    propName[1] === 'n' &&
    propName.charCodeAt(2) >= /* 'A' */ 65 &&
    propName.charCodeAt(2) <= /* 'Z' */ 90
  )
}
