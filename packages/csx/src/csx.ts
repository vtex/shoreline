import { CsxValue } from './csx-value'
import { findTransform } from './transforms'

import type { CsxObject } from './types'

/**
 * Parses a CSXObject into a CSSObject
 * @example
 * csx({ bg: '$bg-primary' })
 */
export function csx(csxObject: CsxObject = {}) {
  const cssObject: any = {}

  for (const key in csxObject) {
    const cssProperty = key
    const cssEntry = csxObject[key as keyof typeof csxObject]

    const value = new CsxValue(cssProperty, cssEntry)
    const transform = findTransform(value.getProperty())

    if (value.isObject()) {
      cssObject[value.getProperty()] = csx(value.getEntry() as CsxObject)
      continue
    }

    Object.assign(cssObject, transform(value))
  }

  return cssObject
}

// interface CsxConfig {
//   aliasFn?: (key: string) => string
//   findTokenTypeFn?: (tokenType: string) => TokenType | undefined
//   findMixinFn?: (prop: string) => Mixin | undefined
//   compoundProps?: Record<string, boolean>
// }
