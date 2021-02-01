import { defaultBreakpoints } from './defaultObjects'
import { StyleProp, Theme, ThemeDerivedStyles } from './types'

export const responsive = (styles: Exclude<StyleProp, ThemeDerivedStyles>) => (
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
