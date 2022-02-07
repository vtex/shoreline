import type { Emotion } from '@emotion/css/create-instance'
import type { CSSObject as EmotionCSSObject } from '@emotion/css'
import { isFunction } from '@vtex/admin-ui-util'

import { alias } from './aliases'
import { resolveRule } from './rules'
import { canSplit, split } from './splits'
import { createTransform } from './transforms'
import type { StyleObject, StyleProp, ThemeDerivedStyles } from './types'
import { theme as defaultTheme } from './theme'

/**
 * Available system breakpoints
 */
const breakpoints = ['40em', '48em', '64em', '75em']

const TOKEN_PREFIX = '$'

/**
 * Available media queries mapped from the breakpoints
 */
const mediaQueries = [
  null,
  ...breakpoints.map((n) => `@media screen and (min-width: ${n})`),
]

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
export function styles(csxObject: StyleProp = {}, theme: any = defaultTheme) {
  const cssObject: EmotionCSSObject = {}
  const responsive = resolveResponsiveArray(csxObject as any)

  for (const key in responsive) {
    const cssProperty = alias(key)
    const mqValue = responsive[key as keyof typeof responsive]
    const token = isFunction(mqValue) ? (mqValue as Function)(theme) : mqValue

    if (token && typeof token === 'object') {
      cssObject[cssProperty] = styles(token as StyleObject)
      continue
    }

    const rule = resolveRule(cssProperty, theme)
    const transform = createTransform(cssProperty)
    const value = transform(rule, extractTokenCall(token))

    if (!!value && typeof value === 'object') {
      // handle default entries on rules
      if (value.default) {
        // handle object rules
        cssObject[cssProperty] =
          typeof value.default === 'object'
            ? styles(value.default)
            : value.default
      } else {
        // handle object rules
        Object.assign(cssObject, styles(value))
      }
    } else if (canSplit(cssProperty)) {
      const splitValue = split(cssProperty, value)

      Object.assign(cssObject, splitValue)
    } else {
      cssObject[cssProperty] = value
    }
  }

  return cssObject
}

export function createCsx(emotion: Emotion, theme?: any) {
  function csx(csxObject: StyleProp) {
    const emotionCSSObject = styles(csxObject, theme)
    const className = emotion.css(emotionCSSObject)

    return className
  }

  return csx
}

export function isToken(token: string) {
  return typeof token === 'string' && token.startsWith(TOKEN_PREFIX)
}

export function extractTokenCall(token: string) {
  return isToken(token) ? token.substring(1) : token
}
