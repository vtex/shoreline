import { CSSObject as EmotionCSSObject } from '@emotion/css'

import { StyleObject, StyleProp, Theme } from './types'

interface Phases {
  alias: {
    value: Record<string, string>
    exec: (prop: string) => string
  }
  rule: {
    value: Record<string, string>
    exec: (prop: string) => any
  }
  split: {
    value: Record<string, string[]>
    exec: (prop: string, value: any) => Record<string, any>
  }
  transform: (
    prop: string
  ) => {
    value: Record<string, string>
    exec: (rule: Record<string, string>, value: any) => any
  }
}

export function createCss(phases: Phases) {
  return function css(csx: StyleProp = {}) {
    return (theme: Theme = {}): EmotionCSSObject => {
      const cssObject: EmotionCSSObject = {}

      // This will loop through all keys of csx
      for (const key in csx) {
        const cssProperty = phases.alias.exec(key)
        const token = csx[key as keyof typeof csx] // tokens are the rule values

        // Resolves nesting
        // onNest()
        if (token && typeof token === 'object') {
          cssObject[cssProperty] = css(token as StyleObject)(theme)
          continue
        }

        // onFindRule()
        const rule = phases.rule.exec(cssProperty)

        // onTransform()
        const transform = phases.transform(cssProperty)
        const value = transform.exec(rule, token)

        // onAssignFinalProperty
        if (typeof value === 'object') {
          Object.assign(cssObject, value)
        } else if (cssProperty in phases.split.value) {
          const splitValue = phases.split.exec(cssProperty, value)
          Object.assign(cssObject, splitValue)
        } else {
          cssObject[cssProperty] = value
        }
      }

      return cssObject
    }
  }
}
