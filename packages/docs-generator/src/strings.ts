/**
 * Check if a string is a component name
 *
 * @params name - The string to be checked
 * @example
 * isComponent('Button') // true
 * isComponent('button') // false
 */
export function isComponent(name: string) {
  return /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/.test(name)
}
