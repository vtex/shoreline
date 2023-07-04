import { alias } from './alias'
import { cleanTokenString } from './clean-token-string'
import { cssVar } from './css-var'
import { defaultCompoundProps } from './default-values'
import { findFoundation } from './find-foundation'
import { isToken } from './is-token'
import { getMixin, isMixin } from './mixins'
import { tokenize } from './tokenize'

interface Config {
  aliasFn: (key: string) => string
}

const defaultConfig: Config = {
  aliasFn: alias,
}

/**
 * Parses a style object
 */
export function csx(csxObject: any = {}, config: Config = defaultConfig) {
  const cssObject: any = {}

  for (const key in csxObject) {
    const cssProperty = config.aliasFn(key)
    const cssEntry = csxObject[key]

    if (cssEntry && typeof cssEntry === 'object') {
      cssObject[cssProperty] = csx(cssEntry, config)
      continue
    }

    const value = getValue(cssProperty, cssEntry)

    if (isMixin(cssProperty)) {
      Object.assign(cssObject, getMixin(cssProperty)(value))
    } else {
      cssObject[cssProperty] = value
    }
  }

  return cssObject
}

function getValue(cssProperty: string, value: string) {
  const foundation = findFoundation(cssProperty)

  if (!foundation) {
    return cleanTokenString(value)
  }

  if (cssProperty in defaultCompoundProps) {
    return tokenize(foundation, value)
  }

  if (!isToken(value)) {
    return value
  }

  const token = cleanTokenString(value)

  return cssVar(foundation, token)
}
