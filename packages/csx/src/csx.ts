import { alias } from './alias'
import { cssVar } from './css-var'
import { defaultCompoundProps } from './default-values'
import { findFoundation } from './find-foundation'
import { getMixin, isMixin } from './mixins'
import type { CsxObject, Foundation } from './types'

interface CsxConfig {
  aliasFn?: (key: string) => string
  findFoundationFn?: (foundation: string) => Foundation | undefined
}

const defaultConfig: CsxConfig = {
  aliasFn: alias,
  findFoundationFn: findFoundation,
}

/**
 * Parses a style object
 */
export function csx(
  csxObject: CsxObject = {},
  config: CsxConfig = defaultConfig
) {
  const { aliasFn = alias, findFoundationFn = findFoundation } = config
  const cssObject: any = {}

  for (const key in csxObject) {
    const cssProperty = aliasFn(key)
    const cssEntry = csxObject[key]

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
          deepSearch: cssProperty in defaultCompoundProps,
        })

    if (isMixin(cssProperty)) {
      Object.assign(cssObject, getMixin(cssProperty)(value))
    } else {
      cssObject[cssProperty] = value
    }
  }

  return cssObject
}
