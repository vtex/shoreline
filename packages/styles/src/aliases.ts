import warning from 'tiny-warning'
import { defaultBreakpoints, Theme } from './index'

export const alias = (key: string, theme: Theme) => {
  const breakpoints =
    (theme && (theme.breakpoints as string[])) || defaultBreakpoints

  const [, tablet, desktop, widescreen] = breakpoints

  const responsiveAliases = {
    '@tablet': `@media (min-width: ${tablet}) and (max-width: ${desktop})`,
    '@desktop': `@media (min-width: ${desktop}) and (max-width: ${widescreen})`,
    '@widescreen': `@media (min-width: ${widescreen})`,
  }

  const aliases = {
    bg: 'backgroundColor',
    fontSettings: 'fontVariationSettings',
    ...responsiveAliases,
  }

  warning(
    breakpoints.length >= 4 || !(key in responsiveAliases),
    `Make sure you have at least 4 breakpoints on your theme before using responsive aliases. Otherwise, your media query may return an unexpected value. Alias: ${key}; Value: ${
      responsiveAliases[key as keyof typeof responsiveAliases]
    }`
  )

  if (key in aliases) {
    return aliases[key as keyof typeof aliases]
  }

  return key
}
