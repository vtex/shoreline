import { defaultBreakpoints, Theme } from './index'

export const alias = (key: string, theme: Theme) => {
  const [, tablet, desktop, wideScreen] =
    (theme && (theme.breakpoints as string[])) || defaultBreakpoints

  const aliases = {
    bg: 'backgroundColor',
    fontSettings: 'fontVariationSettings',
    '@mobile': `@media (max-width: ${tablet})`,
    '@tablet': `@media (max-width: ${desktop})`,
    '@desktop': `@media (max-width: ${wideScreen})`,
    '@wideScreen': `@media (min-width: ${wideScreen})`,
  }

  if (key in aliases) {
    return aliases[key as keyof typeof aliases]
  }

  return key
}
