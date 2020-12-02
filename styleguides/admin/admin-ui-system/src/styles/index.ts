import { CSSObject } from '@emotion/css'

import { StyleProp, ThemeDerivedStyles, Theme, StyleObject } from './types'
import { scales, Scales } from './scales'
import { get } from '../util'

export * from './types'

export const defaultBreakpoints = [40, 52, 64].map((n) => `${n}em`)

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}

const aliases = {
  bg: 'backgroundColor',
  fontVariant: 'fontVariationSettings',
} as const

type Aliases = typeof aliases

export const multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height'],
}

const transformations = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'top',
  'bottom',
  'left',
  'right',
].reduce(
  (acc, curr) => ({
    ...acc,
    /** Transform negative values */
    [curr]: (scale: object, value: string | number) => {
      if (typeof value !== 'number' || value >= 0) {
        if (typeof value === 'string' && value.startsWith('-')) {
          const valueWithoutMinus = value.substring(1)
          const n = get(scale, valueWithoutMinus, valueWithoutMinus)

          return `-${n}`
        }

        return get(scale, value, value)
      }

      const absolute = Math.abs(value)
      const n = get(scale, absolute, absolute)

      if (typeof n === 'string') return `-${n}`

      return Number(n) * -1
    },
  }),
  {}
)

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
    const transform: Function = get(transformations, prop, get)
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
