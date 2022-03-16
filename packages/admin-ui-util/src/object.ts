import deepmerge from 'deepmerge'

export function merge(...params: any): any {
  return deepmerge.all([...params].filter((p) => p))
}

export type Dict<T = any> = Record<string, T>

export function omit<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result: Dict = {}

  Object.keys(object).forEach((key) => {
    if (keys.includes(key as K)) return
    result[key] = object[key]
  })

  return result as Omit<T, K>
}

export function pick<T extends Dict>(object: T, keys: string[]) {
  const result: Dict = {}

  keys.forEach((key) => {
    if (key in object) {
      result[key] = object[key]
    }
  })

  return result
}

/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */
export function get(
  obj: object | null | undefined,
  path: string | number | symbol,
  fallback?: any,
  index?: number
) {
  if (!obj) return fallback

  const key = typeof path === 'string' ? path.split('.') : [path]

  for (index = 0; index < key.length; index += 1) {
    if (!obj) break
    obj = (obj as any)[key[index]]
  }

  return obj === undefined ? fallback : obj
}

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

/**
 * Whether an Record<string, unknown> is empty
 */
export const isObjectEmpty = (obj: Record<string, unknown>) =>
  Object.keys(obj).length === 0 && obj.constructor === Object
