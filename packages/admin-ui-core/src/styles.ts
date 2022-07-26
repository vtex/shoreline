import type { CSS as CSSObject } from '@stitches/react'
import { css } from './stitches.config'

import { parseValue } from './helpers'
import { callUtil, isUtil } from './utils'
import type { StyleObject, StyleProp } from './types'
import { theme as defaultTheme } from './theme'

/**
 * Parses a style object
 */
export function styles(csxObject: StyleProp = {}, theme: any = defaultTheme) {
  const cssObject: CSSObject = {}

  for (const key in csxObject) {
    const { token, cssProperty, value } = parseValue(csxObject, theme, key)

    if (token && typeof token === 'object') {
      cssObject[cssProperty] = styles(token as StyleObject, theme)
      continue
    }

    if (!!value && typeof value === 'object') {
      Object.assign(cssObject, value)
    } else if (isUtil(cssProperty)) {
      Object.assign(cssObject, callUtil(cssProperty, value, theme))
    } else {
      cssObject[cssProperty] = value
    }
  }

  return cssObject
}

export function createCsx(theme?: any) {
  function csx(csxObject: StyleProp) {
    const stitchesCSSObject = styles(csxObject, theme)
    const className = css(stitchesCSSObject)

    return className().toString()
  }

  return csx
}
