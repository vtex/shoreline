import * as polished from 'polished'

import { get } from './util'
import { Theme } from './types'

/**
 * Get color from theme.colors
 */
export const getColor = (theme: Theme, color: string) => {
  const colorValue = get(theme, `colors.${color}`, color)
  const isCustomProperty = /^var\(--/.test(colorValue)

  return isCustomProperty
    ? colorValue.replace(/^var\(--(\w+)(.*?), /, '').replace(/\)/, '')
    : colorValue
}

/**
 * Darken a color by an amount 0–1
 */
export const darken = (c: string, n: number) => (t: Theme) =>
  polished.darken(n, getColor(t, c))
/**
 * Lighten a color by an amount 0–1
 */
export const lighten = (c: string, n: number) => (t: Theme) =>
  polished.lighten(n, getColor(t, c))
/**
 * Rotate the hue of a color by an amount 0–360
 */
export const rotate = (c: string, d: number) => (t: Theme) =>
  polished.adjustHue(d, getColor(t, c))

/**
 * Set the hue of a color to a degree 0–360
 */
export const hue = (c: string, h: number) => (t: Theme) =>
  polished.setHue(h, getColor(t, c))
/**
 * Set the saturation of a color to an amount 0–1
 */
export const saturation = (c: string, s: number) => (t: Theme) =>
  polished.setSaturation(s, getColor(t, c))
/**
 * Set the lightness of a color to an amount 0–1
 */
export const lightness = (c: string, l: number) => (t: Theme) =>
  polished.setLightness(l, getColor(t, c))
/**
 * Desaturate a color by an amount 0–1
 */
export const desaturate = (c: string, n: number) => (t: Theme) =>
  polished.desaturate(n, getColor(t, c))
/**
 * Saturate a color by an amount 0–1
 */
export const saturate = (c: string, n: number) => (t: Theme) =>
  polished.saturate(n, getColor(t, c))

/**
 * Shade a color by an amount 0–1
 */
export const shade = (c: string, n: number) => (t: Theme) =>
  polished.shade(n, getColor(t, c))
/**
 * Tint a color by an amount 0–1
 */
export const tint = (c: string, n: number) => (t: Theme) =>
  polished.tint(n, getColor(t, c))

export const transparentize = (c: string, n: number) => (t: Theme) =>
  polished.transparentize(n, getColor(t, c))
/**
 * Set the transparency of a color to an amount 0-1
 */
export const alpha = (c: string, n: number) => (t: Theme) =>
  polished.rgba(getColor(t, c), n)

/**
 * Mix two colors by a specific ratio
 */
export const mix = (a: string, b: string, n = 0.5) => (t: Theme) =>
  polished.mix(n, getColor(t, a), getColor(t, b))

/**
 * Get the complement of a color
 */
export const complement = (c: string) => (t: Theme) =>
  polished.complement(getColor(t, c))

/**
 * Get the inverted color
 */
export const invert = (c: string) => (t: Theme) =>
  polished.invert(getColor(t, c))

/**
 * Desaturate the color to grayscale
 */
export const grayscale = (c: string) => desaturate(c, 1)
