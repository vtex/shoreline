import { get } from '@vtex/admin-ui-util'

import { paletteMap } from '../types'
import type { Palette, Tone, ColorTokens, StyleProp, CSSUnit } from '../types'
import { colors } from './colors'

export function ring(tone: Tone) {
  const lighterColor = get(colors, `${paletteMap[tone]}05`)
  const darkerColor = get(colors, `${paletteMap[tone]}30`)

  const innerRing = `0rem 0rem 0rem 0.0625rem ${lighterColor}`
  const outerRing = `0rem 0rem 0rem 0.1875rem ${darkerColor}`

  return `${innerRing}, ${outerRing}`
}

export function palette(color: Palette): StyleProp {
  return {
    bg: get(colors, `${color}10`, ''),
    color: get(colors, `${color}60`, ''),
  }
}

export function color(token: ColorTokens) {
  return get(colors, token, '')
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

export function focusVisible(tone: Tone): StyleProp {
  return {
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: `ring.${tone}`,
    },
  }
}

export function border(ct: ColorTokens, widthPx = 1): string {
  return `${widthPx}px solid ${get(colors, ct)}`
}

export function withUnit(value: unknown, unit: CSSUnit): string {
  return typeof value === 'number' ? `${value}${unit}` : `${value}`
}

export function negative(token: string): string {
  return token.startsWith('$') ? `$-${token.substring(1)}` : `-${token}`
}
