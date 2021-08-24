import type { Emotion } from '@emotion/css/create-instance'
import type { CSSObject as EmotionCSSObject } from '@emotion/css'

import type { StepsInstance } from '../system'
import type { StyleObject, StyleProp } from './types'
import { resposiveScale } from './experimental/responsiveScale'

/**
 * Parses a style object
 * TODO: Add StepsInstance as Types
 * @param steps
 * @returns
 */
export function createParser(steps: StepsInstance): CsxParser {
  function csxParser(csx: StyleProp = {}) {
    const cssObject: EmotionCSSObject = {}
    const responsive = resposiveScale(csx as any)

    for (const key in responsive) {
      const cssProperty = steps.aliases.exec(key)
      const token = responsive[key as keyof typeof responsive]

      if (token && typeof token === 'object') {
        cssObject[cssProperty] = csxParser(token as StyleObject)
        continue
      }

      const rule = steps.rules.exec(cssProperty)
      const transform = steps.transforms(cssProperty)
      const value = transform.exec(rule, token)

      if (!!value && typeof value === 'object') {
        // handle default entries on rules
        if (value.default) {
          // handle object rules
          if (typeof value.default === 'object') {
            cssObject[cssProperty] = csxParser(value.default)
          } else {
            cssObject[cssProperty] = value.default
          }
        } else {
          // handle object rules
          Object.assign(cssObject, csxParser(value))
        }
      } else if (cssProperty in steps.splits.value) {
        const splitValue = steps.splits.exec(cssProperty, value)

        Object.assign(cssObject, splitValue)
      } else {
        cssObject[cssProperty] = value
      }
    }

    return cssObject
  }

  return csxParser
}

/**
 * Creates the clsx function that compiles a csx in a className
 * @param emotion a emotion instance
 * @example
 * const emotion = createEmotion({ key: example })
 * const clsx = createClsx(emotion)
 *
 * clsx({
 *   padding: '1rem'
 * }) // will return a className with the style
 */
export function createClsx(emotion: Emotion): ClsxFn {
  function clsx(css?: EmotionCSSObject) {
    const className = emotion.css(css)

    return className
  }

  return clsx
}

export function createAtoms(parser: CsxParser, clsx: ClsxFn) {
  function atoms(csx: StyleProp) {
    const parsed = parser(csx)
    const className = clsx(parsed)

    return className
  }

  return atoms
}

export { Global, CacheProvider } from '@emotion/react'

export type CsxParser = (csx?: StyleProp) => EmotionCSSObject
export type ClsxFn = (css?: EmotionCSSObject) => string
