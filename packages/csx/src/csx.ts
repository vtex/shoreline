import { CsxValue } from './csx-value'
import { findNamespaceTransform } from './namespace-transforms'
import { findTransform } from './transforms'
import type { CsxObject } from './types'

type CSSObject = Record<string, any>

/**
 * Parses a CSXObject into a CSSObject
 * @example
 * csx({ bg: '$bg-primary' })
 */
export function csx(csxObject: CsxObject = {}, namespace = ''): CSSObject {
  const cssObject: CSSObject = {}

  const namespaceTransform = findNamespaceTransform(namespace)

  csxObject = namespaceTransform(csxObject)

  for (const cssProperty in csxObject) {
    const cssEntry = csxObject[cssProperty as keyof typeof csxObject]

    const value = new CsxValue(cssProperty, cssEntry)

    if (value.isObject()) {
      cssObject[value.property] = csx(value.entry as CsxObject, value.property)
      continue
    }

    const transform = findTransform(value.property)

    Object.assign(cssObject, transform(value))
  }

  return cssObject
}
