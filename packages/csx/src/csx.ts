import { CsxValue } from './csx-value'
import { findNamespaceTransform } from './namespace-transforms'
import { findTransform } from './transforms'
import type { CsxObject } from './types'

/**
 * Parses a CSXObject into a CSSObject
 * @example
 * csx({ bg: '$bg-primary' })
 */
export function csx(csxObject: CsxObject = {}, namespace = '') {
  const cssObject: any = {}

  const namespaceTransform = findNamespaceTransform(namespace)

  csxObject = namespaceTransform(csxObject)

  for (const cssProperty in csxObject) {
    const cssEntry = csxObject[cssProperty as keyof typeof csxObject]

    const value = new CsxValue(cssProperty, cssEntry)

    if (value.isObject()) {
      cssObject[value.getProperty()] = csx(
        value.getEntry() as CsxObject,
        value.getProperty()
      )
      continue
    }

    const transform = findTransform(value.getProperty())

    Object.assign(cssObject, transform(value))
  }

  return cssObject
}
