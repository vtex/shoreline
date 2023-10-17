import type { AnyObject } from '@vtex/shoreline-utils'
import { constants } from '@vtex/shoreline-utils'
import type { CsxObject } from '@vtex/shoreline-csx'

const namespaces = {
  '@layer': true,
  '@media': true,
}

export function stackNamespaces(cssObject: AnyObject): AnyObject {
  const stackedObject: AnyObject = {}

  for (const key in cssObject) {
    const value: AnyObject = cssObject[key as keyof CsxObject]

    if (key in namespaces) {
      const namespaceObject: AnyObject = {}

      for (const valueKey in value) {
        const joinedKey = `${key}${constants.whiteSpace}${valueKey}`

        namespaceObject[joinedKey] = value[valueKey]
      }

      Object.assign(stackedObject, namespaceObject)
    } else {
      stackedObject[key] = value
    }
  }

  return stackedObject
}
