import type { AnyObject } from '@vtex/admin-ui-util'
import { extractTokenCall, getTokenValue } from './helpers'
import { get } from '@vtex/admin-ui-util'

import { paletteMap } from './types'
import type { Palette, Tone, ColorTokens, StyleProp } from './types'
import { colors } from './tokens/colors'

export function negative(token: string) {
  return (theme: AnyObject, cssProperty: string): string => {
    const value = getTokenValue(theme, cssProperty, token)

    return `-${value}`
  }
}

export function typography(token: string) {
  return (theme: AnyObject, cssProperty: string): string => {
    return getTokenValue(theme, cssProperty, token)
  }
}

export function ring(tone: Tone) {
  const lighterColor = get(colors, `${paletteMap[tone]}05`)
  const darkerColor = get(colors, `${paletteMap[tone]}30`)

  const innerRing = `0rem 0rem 0rem 0.0625rem ${lighterColor}`
  const outerRing = `0rem 0rem 0rem 0.1875rem ${darkerColor}`

  return `${innerRing}, ${outerRing}`
}

export function palette(color: Palette): StyleProp {
  return {
    bg: `$${color}10`,
    fg: `$${color}60`,
  }
}

export function color(token: ColorTokens) {
  return get(colors, extractTokenCall(token), '')
}

export function border(ct: ColorTokens, widthPx = 1): string {
  return `${widthPx}px solid ${get(colors, extractTokenCall(ct))}`
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
