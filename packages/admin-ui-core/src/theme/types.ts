export type Tone =
  | 'main'
  | 'critical'
  | 'warning'
  | 'positive'
  | 'neutral'
  | 'info'

export type Palette =
  | 'blue'
  | 'red'
  | 'pink'
  | 'lightBlue'
  | 'green'
  | 'orange'
  | 'cyan'
  | 'purple'
  | 'teal'
  | 'gray'

export const paletteMap: Record<Tone, Palette> = {
  critical: 'red',
  warning: 'orange',
  positive: 'green',
  neutral: 'gray',
  info: 'lightBlue',
  main: 'blue',
}

export function asLiterals<T extends string>(array: T[]): T[] {
  return array
}

const bgTokens = asLiterals([
  '$primary',
  '$secondary',
  '$disabled',
  '$positive',
  '$critical',
  '$warning',
  '$info',
  '$inverted',
  '$overlay',
  '$skeleton',
  '$form',
  '$formHover',
  '$formPressed',
  '$formChecked',
  '$formCheckedHover',
  '$formCheckedPressed',
  '$action.neutral.tertiary',
  '$action.neutral.tertiaryHover',
  '$action.neutral.tertiaryPressed',
  '$action.main.primary',
  '$action.main.primaryHover',
  '$action.main.primaryPressed',
  '$action.main.secondary',
  '$action.main.secondaryHover',
  '$action.main.secondaryPressed',
  '$action.main.tertiary',
  '$action.main.tertiaryHover',
  '$action.main.tertiaryPressed',
  '$action.main.tertiarySelected',
  '$action.critical.primary',
  '$action.critical.primaryHover',
  '$action.critical.primaryPressed',
  '$action.critical.secondary',
  '$action.critical.secondaryHover',
  '$action.critical.secondaryPressed',
  '$action.critical.tertiary',
  '$action.critical.tertiaryHover',
  '$action.critical.tertiaryPressed',
  '$action.critical.tertiarySelected',
])

const fgTokens = asLiterals([
  /**
   * Sample documentation
   */
  '$primary',
  /**
   * Sample documentaton
   */
  '$secondary',
  '$disabled',
  '$inverted',
  '$positive',
  '$info',
  '$critical',
  '$warning',
  '$action.neutral.onPrimary',
  '$action.neutral.onSecondary',
  '$action.neutral.onInverted',
  '$action.main.primary',
  '$action.main.secondary',
  '$action.main.tertiary',
  '$action.critical.primary',
  '$action.critical.secondary',
  '$action.critical.tertiary',
  '$form',
  '$formChecked',
])

const borderTokens = asLiterals([
  '$neutral',
  '$mainSelected',
  '$positive',
  '$info',
  '$critical',
  '$warning',
  '$disabled',
  '$form.neutral',
  '$form.neutralHover',
  '$form.neutralFocus',
  '$form.neutralPressed',
  '$form.neutralChecked',
  '$form.neutralCheckedHover',
  '$form.neutralCheckedPressed',
  '$form.critical',
  '$form.criticalHover',
  '$form.criticalFocus',
])

const shadowTokens = asLiterals([
  '$ring.critical',
  '$ring.neutral',
  '$ring.main',
  '$overlay.center',
  '$overlay.bottom',
])

const colorTokens = asLiterals([
  'white',
  'black',
  'blue05',
  'blue10',
  'blue20',
  'blue30',
  'blue40',
  'blue50',
  'blue60',
  'red05',
  'red10',
  'red20',
  'red30',
  'red40',
  'red50',
  'red60',
  'lightBlue05',
  'lightBlue10',
  'lightBlue20',
  'lightBlue30',
  'lightBlue40',
  'lightBlue50',
  'lightBlue60',
  'orange05',
  'orange10',
  'orange20',
  'orange30',
  'orange40',
  'orange50',
  'orange60',
  'cyan05',
  'cyan10',
  'cyan20',
  'cyan30',
  'cyan40',
  'cyan50',
  'cyan60',
  'pink05',
  'pink10',
  'pink20',
  'pink30',
  'pink40',
  'pink50',
  'pink60',
  'gray05',
  'gray20',
  'gray20',
  'gray30',
  'gray40',
  'gray50',
  'gray60',
  'green05',
  'green10',
  'green20',
  'green30',
  'green40',
  'green50',
  'green60',
  'teal05',
  'teal10',
  'teal20',
  'teal30',
  'teal40',
  'teal50',
  'teal60',
  'purple05',
  'purple10',
  'purple20',
  'purple30',
  'purple40',
  'purple50',
  'purple60',
  'grayTransparent05',
  'grayTransparent10',
  'grayTransparent20',
  'grayTransparent30',
  'grayTransparent40',
  'grayTransparent50',
  'grayTransparent60',
  'grayTransparent70',
  'grayTransparent80',
  'grayTransparent90',
])

export type ColorTokens = typeof colorTokens[number]
export type FgTokens = typeof fgTokens[number]
export type BgTokens = typeof bgTokens[number]
export type BorderTokens = typeof borderTokens[number]
export type ShadowTokens = typeof shadowTokens[number]
