import { CSSObject as EmotionCSSObject } from '@emotion/css'
import { StepsInstance } from '@vtex/onda-system'

import { StyleObject, StyleProp, Theme } from './types'

export function createCSS(steps: StepsInstance) {
  return function css(csx: StyleProp = {}) {
    return (theme: Theme = {}): EmotionCSSObject => {
      const cssObject: EmotionCSSObject = {}

      for (const key in csx) {
        const cssProperty = steps.alias.exec(key)
        const token = csx[key as keyof typeof csx]

        if (token && typeof token === 'object') {
          cssObject[cssProperty] = css(token as StyleObject)(theme)
          continue
        }

        const rule = steps.rule.exec(cssProperty)
        const transform = steps.transform(cssProperty)
        const value = transform.exec(rule, token)

        if (typeof value === 'object') {
          Object.assign(cssObject, value)
        } else if (cssProperty in steps.split.value) {
          const splitValue = steps.split.exec(cssProperty, value)
          Object.assign(cssObject, splitValue)
        } else {
          cssObject[cssProperty] = value
        }
      }

      return cssObject
    }
  }
}
