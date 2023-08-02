import deepmerge from 'deepmerge'

import type { AnyObject, Dict } from './utility-types'

export function merge(...params: any): any {
  return deepmerge.all([...params].filter((p) => p))
}

export function flattenObject<T extends AnyObject>(
  object: T,
  joinString = '-',
  defaultString = '*'
): Dict {
  const result: Dict = {}

  for (const i in object) {
    if (typeof object[i] === 'object' && !Array.isArray(object[i])) {
      const temp = flattenObject(object[i], joinString, defaultString)

      for (const j in temp) {
        if (j === defaultString) {
          result[`${i}`] = temp[j]
        } else {
          result[`${i}${joinString}${j}`] = temp[j]
        }
      }
    } else {
      result[i] = object[i]
    }
  }

  return result
}
