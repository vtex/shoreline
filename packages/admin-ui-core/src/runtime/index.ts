import type { Emotion } from '@emotion/css/create-instance'
import type { CSSObject as EmotionCSSObject } from '@emotion/css'
import { isFunction } from '@vtex/admin-ui-util'

import type { StepsInstance } from '../system'
import { buildPlugins } from '../system'
import type { StyleObject, StyleProp, Theme, ThemeDerivedStyles } from './types'
import { plugins } from '../plugins'

export * from './types'

/**
 * Available system breakpoints
 * TODO: Pick it up from the theme object
 */
const breakpoints = ['40em', '48em', '64em', '75em']

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
function experimentalResponsiveScale(
  styles: Exclude<StyleProp, ThemeDerivedStyles>
) {
  const next: Exclude<StyleProp, ThemeDerivedStyles> = {}

  for (const k in styles) {
    const key = k as keyof typeof styles
    const value = styles[key]

    if (value == null) continue

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
      if (value[i] == null) continue
      ;(next[media] as Record<string, unknown>)[key] = value[i]
    }
  }

  return next
}

/**
 * Parses a style object
 * @param steps
 * @returns
 */
export function createStyles(
  steps: StepsInstance,
  theme: Theme
): StylesFunction {
  function styles(csx: StyleProp = {}) {
    const cssObject: EmotionCSSObject = {}
    const responsive = experimentalResponsiveScale(csx as any)

    for (const key in responsive) {
      const cssProperty = steps.aliases.exec(key)
      const mqValue = responsive[key as keyof typeof responsive]
      const token = isFunction(mqValue) ? (mqValue as Function)(theme) : mqValue

      if (isFunction(token)) {
        console.log({
          token,
        })
      }

      if (token && typeof token === 'object') {
        cssObject[cssProperty] = styles(token as StyleObject)
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
            cssObject[cssProperty] = styles(value.default)
          } else {
            cssObject[cssProperty] = value.default
          }
        } else {
          // handle object rules
          Object.assign(cssObject, styles(value))
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

  return styles
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

export function createAtoms(parser: StylesFunction, clsx: ClsxFn) {
  function atoms(csx: StyleProp) {
    const parsed = parser(csx)
    const className = clsx(parsed)

    return className
  }

  return atoms
}

export function createRuntime(theme: Record<string, any>, emotion: Emotion) {
  const steps = buildPlugins(theme, plugins)
  const styles = createStyles(steps, theme)
  const clsx = createClsx(emotion)
  const atoms = createAtoms(styles, clsx)

  return {
    steps,
    styles,
    atoms,
    clsx,
  }
}

export type StylesFunction = (csx?: StyleProp) => EmotionCSSObject
export type ClsxFn = (css?: EmotionCSSObject) => string
