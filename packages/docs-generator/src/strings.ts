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

/**
 * Transform a string to kebab-case
 *
 * @param name - The string to be converted
 */
export function toKebabCase(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Acronyms list that should be capitalized when
 * converting a filename to capitalized case.
 *
 * Useful while generating _meta.json files.
 */
export const acronyms: Record<string, string> = {
  api: 'API',
}
