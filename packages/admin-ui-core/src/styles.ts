import type { CSS as CSSObject } from '@stitches/react'
import { css } from './stitches.config'
import { isFunction } from '@vtex/admin-ui-util'

import { alias } from './aliases'
import { resolveRule } from './rules'
import { callUtil, isUtil } from './utils'
import { createTransform } from './transforms'
import type { StyleObject, StyleProp } from './types'
import { theme as defaultTheme } from './theme'

const TOKEN_PREFIX = '$'

/**
 * Parses a style object
 */
export function styles(csxObject: StyleProp = {}, theme: any = defaultTheme) {
  const cssObject: CSSObject = {}

  for (const key in csxObject) {
    const cssProperty = alias(key)
    const csxValue = csxObject[key as keyof typeof csxObject]
    const token = isFunction(csxValue)
      ? (csxValue as Function)(theme)
      : csxValue

    if (token && typeof token === 'object') {
      cssObject[cssProperty] = styles(token as StyleObject, theme)
      continue
    }

    const rule = resolveRule(cssProperty, theme)
    const transform = createTransform(cssProperty)
    const value = transform(rule, extractTokenCall(token))

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

export function createCsx(theme?: any) {
  function csx(csxObject: StyleProp) {
    const stitchesCSSObject = styles(csxObject, theme)
    const className = css(stitchesCSSObject)

    return className().toString()
  }

  return csx
}

export function isToken(token: string) {
  return typeof token === 'string' && token.startsWith(TOKEN_PREFIX)
}

export function extractTokenCall(token: string) {
  return isToken(token) ? token.substring(1) : token
}

export const cx = (...args: string[]) => args.join(' ')
