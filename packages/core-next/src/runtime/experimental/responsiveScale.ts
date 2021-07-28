import type { StyleProp, ThemeDerivedStyles } from '../types'

const breakpoints = ['40em', '48em', '64em', '75em']

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
export function resposiveScale(styles: Exclude<StyleProp, ThemeDerivedStyles>) {
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
