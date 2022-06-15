import type { CSS as CSSObject } from '@stitches/react'
import { css } from './stitches.config'
import type { AnyObject } from '@vtex/admin-ui-util'
import { isFunction } from '@vtex/admin-ui-util'

import { alias } from './aliases'
import type { StyleObject, StyleProp, ThemeDerivedStyles } from './types'
import { theme as defaultTheme } from './theme'
import { handle } from './handlers'

/**
 * Available media queries mapped from the breakpoints
 */
const mediaQueries = [null, '@mobile', '@tablet', '@desktop', '@widescreen']

/**
 * This function allows the responsive arrays
 * @example
 * csx({
 *  width: [20, 30, 40]
 * })
 */
function resolveResponsiveArray(
  styles: Exclude<StyleProp, ThemeDerivedStyles>
): Exclude<StyleProp, ThemeDerivedStyles> {
  const next: any = {}

  for (const k in styles) {
    const key = k as keyof typeof styles
    const value = styles[key]

    if (value === null) {
      continue
    }

    if (!Array.isArray(value)) {
      next[key] = value
      continue
    }

    for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
      const media = mediaQueries[i]

      if (!media) {
        next[key] = value[i]
        continue
      }

      next[media] = next[media] ?? {}

      if (value[i] == null) {
        continue
      }

      next[media][key] = value[i]
    }
  }

  return next
}

/**
 * Parses a style object
 */
export function styles(
  csxObject: StyleProp = {},
  theme: AnyObject = defaultTheme
) {
  const cssObject: CSSObject = {}
  const responsive = resolveResponsiveArray(csxObject as any)

  // O(n) linear keys
  for (const key in responsive) {
    const cssProperty = alias(key)
    const mqValue = responsive[key as keyof typeof responsive]
    const token = isFunction(mqValue) ? (mqValue as Function)(theme) : mqValue

    // deep O(n) rules
    if (token && typeof token === 'object') {
      cssObject[cssProperty] = styles(token as StyleObject, theme)
      continue
    }

    // leaf | O(1)
    const res = handle({
      cssProp: cssProperty,
      token,
      theme,
    })

    Object.assign(cssObject, res)
  }

  return cssObject
}

export function createCsx(theme: AnyObject = defaultTheme) {
  function csx(csxObject: StyleProp) {
    const stitchesCSSObject = styles(csxObject, theme)
    const className = css(stitchesCSSObject)

    return className().toString()
  }

  return csx
}

export const cx = (...args: string[]) => args.join(' ')
