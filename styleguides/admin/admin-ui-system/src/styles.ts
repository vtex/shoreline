import { CSSObject } from '@emotion/css'

import { StyleProp, ThemeDerivedStyles, Theme, StyleObject } from './types'
import {
  scales,
  aliases,
  defaultTheme,
  defaultBreakpoints,
  multiples,
  transformations,
} from './constants'
import { get } from './util'

type Scales = typeof scales
type Aliases = typeof aliases

const responsive = (styles: Exclude<StyleProp, ThemeDerivedStyles>) => (
  theme?: Theme
) => {
  const next: Exclude<StyleProp, ThemeDerivedStyles> = {}
  const breakpoints =
    (theme && (theme.breakpoints as string[])) || defaultBreakpoints

  const mediaQueries = [
    null,
    ...breakpoints.map((n) => `@media screen and (min-width: ${n})`),
  ]

  for (const k in styles) {
    const key = k as keyof typeof styles
    let value = styles[key]

    if (typeof value === 'function') {
      value = value(theme ?? {})
    }

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

type CssPropsArgument = { theme: Theme } | Theme

export const styles = (args: StyleProp = {}) => (
  props: CssPropsArgument = {}
): CSSObject => {
  const theme: Theme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  }

  const result: CSSObject = {}
  let obj = typeof args === 'function' ? args(theme) : args

  if (obj.themeKey) {
    obj = { ...get(theme, obj.themeKey), ...obj }
    delete obj.themeKey
  }

  const stylx = responsive(obj)(theme)

  for (const key in stylx) {
    const x = stylx[key as keyof typeof stylx]
    const val = typeof x === 'function' ? x(theme) : x

    if (val && typeof val === 'object') {
      result[key] = styles(val as StyleObject)(theme)
      continue
    }

    const prop = key in aliases ? aliases[key as keyof Aliases] : key
    const scaleName = prop in scales ? scales[prop as keyof Scales] : undefined
    const scale = get(theme, scaleName as string, get(theme, prop, {}))
    const transform = get(transformations, prop, get)
    let value = transform(scale, val, val)
    const isObjectScale = value && typeof value === 'object'

    if (isObjectScale) {
      value = styles(value)(theme)
      Object.assign(result, value)
      delete result[prop]
    }

    if (prop in multiples) {
      const dirs = multiples[prop as keyof typeof multiples]

      for (let i = 0; i < dirs.length; i++) {
        result[dirs[i]] = value
      }
    } else if (!isObjectScale) {
      result[prop] = value
    }
  }

  return result
}
