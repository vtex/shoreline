/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * omit with array
 */
export const omit = (obj: { [x: string]: any }, ...keys: string[]) => {
  return Object.keys(obj).reduce((newObject, key) => {
    if (keys.indexOf(key) === -1) (newObject as any)[key] = obj[key]

    return newObject
  }, {})
}
