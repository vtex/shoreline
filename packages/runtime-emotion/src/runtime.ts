import createEmotion from '@emotion/css/create-instance'
import { CSSObject as EmotionCSSObject } from '@emotion/css'
import { createRuntime } from '@vtex/onda-system'

import { StyleObject, StyleProp } from './types'

export const runtime = createRuntime({
  name: 'onda-runtime-emotion',
  onInstance: ({ id }: { id: string }) => {
    const emotion = createEmotion({
      key: id,
    })

    return emotion
  },
  onParse: (steps) => {
    return function css(csx: StyleProp = {}) {
      const cssObject: EmotionCSSObject = {}

      for (const key in csx) {
        const cssProperty = steps.alias.exec(key)
        const token = csx[key as keyof typeof csx]

        if (token && typeof token === 'object') {
          cssObject[cssProperty] = css(token as StyleObject)
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
  },
  onCompile: (instance) => {
    return function complie(meta) {
      const className = instance.css(meta)
      return className
    }
  },
})
