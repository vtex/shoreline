import { get } from '@vtex/admin-ui-util'

import { paletteMap } from './types'
import type { Palette, Tone, ColorTokens, StyleProp, CSSUnit } from './types'
import { colors } from './tokens/colors'
import { rules } from './rules'

const TOKEN_PREFIX = '$'

export function ring(tone: Tone) {
  const lighterColor = get(colors, `${paletteMap[tone]}05`)
  const darkerColor = get(colors, `${paletteMap[tone]}30`)

  const innerRing = `0rem 0rem 0rem 0.0625rem ${lighterColor}`
  const outerRing = `0rem 0rem 0rem 0.1875rem ${darkerColor}`

  return `${innerRing}, ${outerRing}`
}

export function palette(color: Palette) {
  return {
    background: resolveCssValue(`$${color}10`, 'background'),
    color: resolveCssValue(`$${color}60`, 'color'),
  }
}

export function color(token: ColorTokens) {
  return get(colors, extractTokenCall(token), '')
}

export function listBoxItem(tone: 'main' | 'critical', selected = false) {
  return {
    bg: `listBoxItem.${tone}${selected ? 'Selected' : ''}`,
    color: `listBoxItem.${tone}${selected ? 'Selected' : ''}`,
    ':hover': {
      bg: `listBoxItem.${tone}Hover`,
      color: `listBoxItem.${tone}Hover`,
    },
    ':pressed': {
      bg: `listBoxItem.${tone}Pressed`,
      color: `listBoxItem.${tone}Pressed`,
    },
  }
}

export function focusVisible(
  tone: Tone,
  styleProps?: {
    focus?: StyleProp
    polyfill?: StyleProp
  }
): StyleProp {
  return {
    ':focus': {
      outline: 'none',
      boxShadow: ring(tone),
      ...styleProps?.focus,
    },
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
      ...styleProps?.polyfill,
    },
  }
}

export function border(ct: ColorTokens, widthPx = 1): string {
  return `${widthPx}px solid ${get(colors, extractTokenCall(ct))}`
}

export function withUnit(value: unknown, unit: CSSUnit): string {
  return typeof value === 'number' ? `${value}${unit}` : `${value}`
}

export function isToken(token: string) {
  return typeof token === 'string' && token.startsWith(TOKEN_PREFIX)
}

export function extractTokenCall(token: string) {
  return isToken(token) ? token.substring(1) : token
}

export const cx = (...args: string[]) => args.join(' ')

export function resolveTokenValue(value: string) {
  const suffix = extractTokenCall(value).split('.').join('-')

  return `var(--admin-ui-${suffix})`
}

export function resolveCssValue(value: string | number, cssProperty: string) {
  if (typeof value === 'number' || !isToken(value)) {
    return value
  }

  const ruleId = get(rules, cssProperty, cssProperty)
  const tokenSuffix = extractTokenCall(value)
    .replace('/', '_')
    .split('.')
    .join('-')

  return `var(--admin-ui-${ruleId}-${tokenSuffix})`
}
