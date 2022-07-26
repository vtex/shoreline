import type { AnyObject } from '@vtex/admin-ui-util'
import { isFunction, get } from '@vtex/admin-ui-util'

import { resolveRule } from './rules'
import type { StyleProp, CSSUnit } from './types'
import { alias } from './aliases'

const TOKEN_PREFIX = '$'

export function withUnit(value: unknown, unit: CSSUnit): string {
  return typeof value === 'number' ? `${value}${unit}` : `${value}`
}

export function isToken(token: string) {
  return typeof token === 'string' && token.startsWith(TOKEN_PREFIX)
}

export function extractTokenCall(token: string) {
  return isToken(token) ? token.substring(1) : token
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

export const cx = (...args: string[]) => args.join(' ')

export const parseValue = (
  csxObject: StyleProp,
  theme: any,
  rawProperty: string
) => {
  const cssProperty = alias(rawProperty)
  const csxValue = csxObject[rawProperty as keyof typeof csxObject]
  const token = isFunction(csxValue)
    ? (csxValue as Function)(theme, cssProperty)
    : csxValue

  const value = getTokenValue(theme, cssProperty, token)

  return { token, cssProperty, value }
}
