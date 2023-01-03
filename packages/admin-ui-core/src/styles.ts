import type { CSS as CSSObject } from '@stitches/react'
import { css } from './stitches.config'
import type { AnyObject } from '@vtex/admin-ui-util'
import { isFunction, get } from '@vtex/admin-ui-util'

import { alias } from './aliases'
import { resolveRule } from './rules'
import { callUtil, isUtil } from './utils'
import type { StyleObject, StyleProp } from './types'
import { theme as defaultTheme } from './theme'
import { extractTokenCall } from './helpers'

const COMPOUND_PROPS: Record<string, boolean> = {
  padding: true,
  margin: true,
}

const SPACE = ' '

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

    if (isUtil(cssProperty)) {
      Object.assign(cssObject, callUtil(cssProperty, value))
    } else {
      cssObject[cssProperty] = value
    }
  }

  return cssObject
}

/**
 * Check if token might be a compound property
 */
function isCompoundProp(cssProperty: string, token: string) {
  return cssProperty in COMPOUND_PROPS && typeof token === 'string'
}

/**
 * Get css value from possibly compound token value
 */
function getCompoundTokenValue(token: string, rule: AnyObject) {
  const rawValues = token
    .split(SPACE)
    .map((tk: string) => getValueFromRule(tk, rule))

  return rawValues.join(SPACE)
}

/**
 * Get css value for a token based on a rule object
 */
function getValueFromRule(token: string, rule: AnyObject) {
  const extractedToken = extractTokenCall(token)
  const value = get(rule, extractedToken, extractedToken)

  return value
}

/**
 * Get css value from a token for a css property
 */
export function getTokenValue(
  theme: AnyObject,
  cssProperty: string,
  token: any
) {
  const rule = resolveRule(cssProperty, theme)

  const value = isCompoundProp(cssProperty, token)
    ? getCompoundTokenValue(token, rule)
    : getValueFromRule(token, rule)

  return value
}

export function createCsx(theme?: any) {
  function csx(csxObject: StyleProp) {
    const stitchesCSSObject = styles(csxObject, theme)
    const className = css(stitchesCSSObject)

    return className().toString()
  }

  return csx
}

export const csx = createCsx(defaultTheme)
