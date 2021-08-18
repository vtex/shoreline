/**
 * Check whether the string is in kebab case
 * @param name
 * @returns boolean
 */
export function isKebab(name: string) {
  const regExp = RegExp(/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/)

  return regExp.test(name)
}
