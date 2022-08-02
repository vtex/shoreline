import type { CSS as CSSObject } from '@stitches/react'
import { css } from './stitches.config'
import type { AnyObject } from '@vtex/admin-ui-util'
import { isFunction, get } from '@vtex/admin-ui-util'

import { alias } from './aliases'
import { resolveRule } from './rules'
import { callUtil, isUtil } from './utils'
import type { StyleObject, StyleProp } from './types'
import { theme as defaultTheme } from './theme'
import { extractTokenCall, isToken, resolveCssValue } from './helpers'

/**
 * Parses a style object
 */
export function styles(csxObject: StyleProp = {}, theme: any = defaultTheme) {
  const cssObject: CSSObject = {}

  for (const key in csxObject) {
    const cssProperty = alias(key)
    const csxValue = csxObject[key as keyof typeof csxObject]
    const token = isFunction(csxValue)
      ? (csxValue as Function)(theme, cssProperty)
      : csxValue

    if (token && typeof token === 'object') {
      cssObject[cssProperty] = styles(token as StyleObject, theme)
      continue
    }

    const value = getTokenValue(theme, cssProperty, token)

    if (!!value && typeof value === 'object') {
      Object.assign(cssObject, value)
    } else if (isUtil(cssProperty)) {
      Object.assign(cssObject, callUtil(cssProperty, value))
    } else {
      cssObject[cssProperty] = value
    }
  }

  return cssObject
}

function toKebabCase(csxProperty: string) {
  return csxProperty.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function resolveCssObject(csxObject: StyleProp) {
  const cssObject: CSSObject = {}

  for (const key in csxObject) {
    cssObject[key] = csxObject[key as keyof typeof csxObject]
  }

  return cssObject
}

/**
 * Parses a style object
 */
export function stylesCss(csxObject: StyleProp = {}) {
  const cssObject: CSSObject = {}

  for (const key in csxObject) {
    const cssProperty = alias(key)
    const csxValue = csxObject[key as keyof typeof csxObject]
    const token = csxValue

    if (token && typeof token === 'object') {
      cssObject[cssProperty] = stylesCss(token as StyleObject)
      continue
    }

    if (isUtil(cssProperty)) {
      const csxTokenObject: StyleProp = callUtil(cssProperty, token)

      Object.assign(cssObject, resolveCssObject(csxTokenObject))
    } else if (isToken(token)) {
      cssObject[cssProperty] = resolveCssValue(token, cssProperty)
    } else {
      cssObject[cssProperty] = token
    }
  }

  return cssObject
}

export function getTokenValue(
  theme: AnyObject,
  cssProperty: string,
  token: any
) {
  const rule = resolveRule(cssProperty, theme)
  const extractedToken = extractTokenCall(token)
  const rawValue = get(rule, extractedToken, extractedToken)

  return rawValue
}

export function createCsx(theme?: any) {
  function csx(csxObject: StyleProp) {
    const stitchesCSSObject = styles(csxObject, theme)
    const className = css(stitchesCSSObject)

    return className().toString()
  }

  return csx
}
