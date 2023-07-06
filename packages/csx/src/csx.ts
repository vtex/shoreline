import { alias } from './alias'
import { cssVar } from './css-var'
import { defaultCompoundProps } from './default-values'
import { findFoundation } from './find-foundation'
import { findMixin } from './find-mixin'

import type { CsxObject, Foundation, Mixin } from './types'

const defaultConfig: CsxConfig = {
  aliasFn: alias,
  findFoundationFn: findFoundation,
  findMixinFn: findMixin,
  compoundProps: defaultCompoundProps,
}

/**
 * Parses a CSXObject into a CSSObject
 * @example
 * csx({ bg: '$primary' })
 */
export function csx(
  csxObject: CsxObject = {},
  config: CsxConfig = defaultConfig
) {
  const {
    aliasFn = alias,
    findFoundationFn = findFoundation,
    findMixinFn = findMixin,
    compoundProps = defaultCompoundProps,
  } = config

  const cssObject: any = {}

  for (const key in csxObject) {
    const cssProperty = aliasFn(key)
    const cssEntry = csxObject[key as keyof typeof csxObject]

    if (cssEntry && typeof cssEntry === 'object') {
      cssObject[cssProperty] = csx(cssEntry, config)
      continue
    }

    const foundation = findFoundationFn(cssProperty)

    const value = !foundation
      ? cssEntry
      : cssVar({
          foundation,
          token: cssEntry,
          deepSearch: cssProperty in compoundProps,
        })

    const mixin = findMixinFn(cssProperty)

    if (mixin) {
      Object.assign(cssObject, mixin(value))
    } else {
      cssObject[cssProperty] = value
    }
  }

  return cssObject
}

interface CsxConfig {
  aliasFn?: (key: string) => string
  findFoundationFn?: (foundation: string) => Foundation | undefined
  findMixinFn?: (prop: string) => Mixin | undefined
  compoundProps?: Record<string, boolean>
}
