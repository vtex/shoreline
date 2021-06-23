import createEmotion from '@emotion/css/create-instance'
import { Global } from '@emotion/react'
import { CSSObject as EmotionCSSObject } from '@emotion/css'
import { createRuntime } from '@vtex/onda-system'

import { StyleObject, StyleProp } from './types'

export const runtime = createRuntime({
  name: 'onda-runtime-emotion',
  instance: ({ id }: { id: string }) => {
    const emotion = createEmotion({
      key: id,
    })

    return { Global, emotion }
  },
  parser: (steps) => {
    return function css(csx: StyleProp = {}) {
      const cssObject: EmotionCSSObject = {}

      for (const key in csx) {
        const cssProperty = steps.aliases.exec(key)
        const token = csx[key as keyof typeof csx]

        if (token && typeof token === 'object') {
          cssObject[cssProperty] = css(token as StyleObject)
          continue
        }

        const rule = steps.rules.exec(cssProperty)
        const transform = steps.transforms(cssProperty)
        const value = transform.exec(rule, token)

        if (typeof value === 'object') {
          // handle default entries on rules
          if (value.default) {
            // handle object rules
            if (typeof value.default === 'object') {
              cssObject[cssProperty] = css(value.default)
            } else {
              cssObject[cssProperty] = value.default
            }
          } else {
            // handle object rules
            Object.assign(cssObject, css(value))
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
  },
  compiler: ({ emotion }) => {
    return function compile(meta) {
      const className = emotion.css(meta)
      return className
    }
  },
})
