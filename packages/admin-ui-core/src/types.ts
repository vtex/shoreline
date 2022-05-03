import type * as CSS from 'csstype'

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

export const bgTokens = asLiterals([
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
  '$form.neutral',
  '$form.neutralHover',
  '$form.neutralPressed',
  '$form.neutralChecked',
  '$form.neutralCheckedHover',
  '$form.neutralCheckedPressed',
  '$form.neutralInactive',
  '$form.neutralInactiveHover',
  '$form.neutralInactivePressed',
  '$form.neutralActive',
  '$form.neutralActiveHover',
  '$form.neutralActivePressed',
  '$form.controlHover',
  '$form.controlChecked',
  '$form.controlCheckedHover',
])

export const fgTokens = asLiterals([
  '$primary',
  '$secondary',
  '$disabled',
  '$inverted',
  '$positive',
  '$info',
  '$critical',
  '$warning',
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
  '$form.neutral',
  '$form.neutralChecked',
  '$form.controlChecked',
])

export const borderTokens = asLiterals([
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
  '$form.control',
  '$form.controlHover',
  '$form.controlChecked',
  '$form.controlCheckedHover',
])

export const shadowTokens = asLiterals([
  '$ring.critical',
  '$ring.neutral',
  '$ring.main',
  '$overlay.center',
  '$overlay.bottom',
])

export const textTokens = asLiterals([
  '$pageTitle',
  '$title1',
  '$title2',
  '$action1',
  '$action2',
  '$display',
  '$body',
  '$detail',
])

export const colorTokens = asLiterals([
  'white',
  'black',
  'blue05',
  'blue10',
  'blue20',
  'blue30',
  'blue40',
  'blue50',
  'blue60',
  'lightBlue05',
  'lightBlue10',
  'lightBlue20',
  'lightBlue30',
  'lightBlue40',
  'lightBlue50',
  'lightBlue60',
  'red05',
  'red10',
  'red20',
  'red30',
  'red40',
  'red50',
  'red60',
  'green05',
  'green10',
  'green20',
  'green30',
  'green40',
  'green50',
  'green60',
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
  'purple05',
  'purple10',
  'purple20',
  'purple30',
  'purple40',
  'purple50',
  'purple60',
  'pink05',
  'pink10',
  'pink20',
  'pink30',
  'pink40',
  'pink50',
  'pink60',
  'teal05',
  'teal10',
  'teal20',
  'teal30',
  'teal40',
  'teal50',
  'teal60',
  'gray05',
  'gray10',
  'gray20',
  'gray30',
  'gray40',
  'gray50',
  'gray60',
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

export const spaceTokens = asLiterals([
  '$xs',
  '$s',
  '$m',
  '$l',
  '$xl',
  '$2xl',
  '$narrow.s',
  '$narrow.m',
  '$narrow.l',
])

export const hspaceTokens = asLiterals([
  '$xs',
  '$s',
  '$m',
  '$l',
  '$xl',
  '$2xl',
  '$3xl',
])

export const vspaceTokens = asLiterals([
  '$xs',
  '$s',
  '$m',
  '$l',
  '$xl',
  '$2xl',
  '$3xl',
])

export type ColorTokens = typeof colorTokens[number]
export type FgTokens = typeof fgTokens[number]
export type BgTokens = typeof bgTokens[number]
export type BorderTokens = typeof borderTokens[number]
export type ShadowTokens = typeof shadowTokens[number]
export type TextTokens = typeof textTokens[number]
export type SpaceTokens = typeof spaceTokens[number]
export type HSpaceTokens = typeof hspaceTokens[number]
export type VSpaceTokens = typeof vspaceTokens[number]

export type StandardCSSProperties = CSS.Properties<number | string>

export type ResponsiveStyleValue<T> = T | Array<T | null | undefined>

/**
 * All non-vendor-prefixed CSS properties. (Allow `number` to support CSS-in-JS libs,
 * since they are converted to pixels)
 */
export type EmotionCSSProperties = CSS.StandardProperties<number | string> &
  CSS.SvgProperties<number | string> &
  CSS.VendorProperties<number | string>

/**
 * Map of all CSS pseudo selectors (`:hover`, `:focus`, ...)
 */
export type CSSPseudoSelectorProps = { [K in CSS.Pseudos]?: StyleProp }

export interface AliasesCSSProperties {
  /**
   * Shorthand for backgroundColor
   */
  bg?: BgTokens | CSS.Property.Background
  /**
   * Shorthand for marginLeft & marginRight
   */
  marginX?: HSpaceTokens | CSS.Property.MarginLeft | number
  /**
   * Shorthand for marginTop & marginBottom
   */
  marginY?: VSpaceTokens | CSS.Property.MarginTop | number
  /**
   * Shorthand for paddingLeft & paddingRight
   */
  paddingX?: HSpaceTokens | CSS.Property.PaddingLeft | number
  /**
   * Shorthand for paddingTop & paddingBottom
   */
  paddingY?: VSpaceTokens | CSS.Property.PaddingTop | number
  /**
   * Shorthand for width & height
   */
  size?: StandardCSSProperties['width']
  /**
   * Admin-ui available text patterns
   */
  text?: TextTokens
}

export interface ResponsiveAliases {
  '@tablet'?: StyleProp
  '@desktop'?: StyleProp
  '@widescreen'?: StyleProp
}

export interface OverwriteCSSProperties {
  /**
   * CSS **`color`** property
   * @default currentColor
   */
  color?: FgTokens | CSS.Property.Color
  /**
   * CSS **`backgroundColor`** property
   * @default transparent
   */
  backround?: BgTokens | CSS.Property.BackgroundColor
  /**
   * CSS **`border`** property
   * @default currentColor
   */
  border?: BorderTokens | CSS.Property.BorderColor
  /**
   * CSS **`caretColor`** property
   * @default currentColor
   */
  caretColor?: ColorTokens | CSS.Property.CaretColor
  /**
   * CSS **`columnRuleColor`** property
   * @default currentColor
   */
  columnRuleColor?: ColorTokens | CSS.Property.ColumnRuleColor
  /**
   * CSS **`borderTopColor`** property
   * @default currentColor
   */
  borderTopColor?: BorderTokens | CSS.Property.BorderTopColor
  /**
   * CSS **`borderBottomColor`** property
   * @default currentColor
   */
  borderBottomColor?: BorderTokens | CSS.Property.BorderBottomColor
  /**
   * CSS **`borderLeftColor`** property
   * @default currentColor
   */
  borderLeftColor?: BorderTokens | CSS.Property.BorderLeftColor
  /**
   * CSS **`borderRightColor`** property
   * @default currentColor
   */
  borderRightColor?: BorderTokens | CSS.Property.BorderRightColor
  /**
   * CSS **`outlineColor`** property
   * @default currentColor
   */
  outlineColor?: ColorTokens | CSS.Property.OutlineColor
  /**
   * CSS **`fill`** property
   * @default currentColor
   */
  fill?: ColorTokens | CSS.Property.Fill
  /**
   * CSS **`stroke`** property
   * @default currentColor
   */
  stroke?: ColorTokens | CSS.Property.Stroke
  /**
   * CSS **`box-shadow`** property
   * @default none
   */
  boxShadow?: CSS.Property.BoxShadow | number
  /**
   * CSS **`border-top-style`** property
   * @default none
   */
  borderTopStyle?: CSS.Property.BorderTopStyle | string
  /**
   * CSS **`border-top-width`** property
   * @default medium
   */
  borderTopWidth?: CSS.Property.BorderTopWidth<never> | string
  /**
   * CSS **`border-bottom-style`** property
   * @default none
   */
  borderBottomStyle?: CSS.Property.BorderBottomStyle | string
  /**
   * CSS **`border-right-style`** property
   * @default none
   */
  borderRightStyle?: CSS.Property.BorderRightStyle | string
  /**
   * CSS **`border-left-style`** property
   * @default none
   */
  borderLeftStyle?: CSS.Property.BorderLeftStyle | string
  /**
   * CSS **`border-radius`** property
   */
  borderRadius?: CSS.Property.BorderRadius<string | number>
  /**
   * CSS **`z-index`** property
   * @default auto
   */
  zIndex?: CSS.Property.ZIndex | string
  /**
   * CSS **padding** property
   */
  padding?: CSSPropAutocomplete<SpaceTokens> | CSS.Globals | number
  /**
   * CSS **paddingTop** property
   */
  paddingTop?: CSSPropAutocomplete<VSpaceTokens> | CSS.Globals | number
  /**
   * CSS **paddingBottom** property
   */
  paddingBottom?: CSSPropAutocomplete<VSpaceTokens> | CSS.Globals | number
  /**
   * CSS **paddingLeft** property
   */
  paddingLeft?: CSSPropAutocomplete<HSpaceTokens> | CSS.Globals | number
  /**
   * CSS **paddingRight** property
   */
  paddingRight?: CSSPropAutocomplete<HSpaceTokens> | CSS.Globals | number
  /**
   * CSS **margin** property
   */
  margin?: CSSPropAutocomplete<SpaceTokens> | CSS.Globals | number
  /**
   * CSS **marginTop** property
   */
  marginTop?: CSSPropAutocomplete<VSpaceTokens> | CSS.Globals | number
  /**
   * CSS **marginBottom** property
   */
  marginBottom?: CSSPropAutocomplete<VSpaceTokens> | CSS.Globals | number
  /**
   * CSS **marginLeft** property
   */
  marginLeft?: CSSPropAutocomplete<HSpaceTokens> | CSS.Globals | number
  /**
   * CSS **marginRight** property
   */
  marginRight?: CSSPropAutocomplete<HSpaceTokens> | CSS.Globals | number
}

/**
 * Map of all available CSS properties (including aliases and overwrites)
 * and their raw value.
 */
export interface ExtendedCSSProps
  extends Omit<EmotionCSSProperties, keyof OverwriteCSSProperties>,
    AliasesCSSProperties,
    OverwriteCSSProperties {}

export type StylePropertyValue<T> =
  | ResponsiveStyleValue<Exclude<T, undefined>>
  | ((theme: Theme) => ResponsiveStyleValue<Exclude<T, undefined>>)
  | StyleProp

export type CSSProps = {
  [K in keyof ExtendedCSSProps]: StylePropertyValue<ExtendedCSSProps[K]>
}

export interface ThemeDerivedStyles {
  (theme: Theme): StyleObject
}

export interface CSSOthersObject {
  // we want to match CSS selectors
  // but index signature needs to be a supertype
  // so as a side-effect we allow unknown CSS properties (Emotion does too)
  [k: string]: StylePropertyValue<string | number> | undefined | null
}

export type StyleObject = CSSProps &
  CSSPseudoSelectorProps &
  CSSOthersObject &
  ResponsiveAliases

/**
 * The `StyleProp` extends [style props](https://emotion.sh/docs/object-styles)
 * such that properties that are part of the `Theme` will be transformed to
 * their corresponding values. Other valid CSS properties are also allowed.
 */
export type StyleProp = StyleObject | ThemeDerivedStyles

/**
 * An array or object (possibly nested) of related CSS properties
 */
export type Scale<T> = T[] | { [K: string]: T | Scale<T>; [I: number]: T }

export interface Theme {
  global?: {
    imports?: string[]
    styles?: StyleObject
  }
  breakpoints?: string[]
  mediaQueries?: { [size: string]: string }
  space?: Scale<CSS.Property.Margin<number | string>>
  fontSizes?: Scale<CSS.Property.FontSize<number>>
  fonts?: Scale<CSS.Property.FontFamily>
  fontWeights?: Scale<CSS.Property.FontWeight>
  lineHeights?: Scale<CSS.Property.LineHeight<string | 0 | number>>
  letterSpacings?: Scale<CSS.Property.LetterSpacing<string | 0 | number>>
  sizes?: Scale<CSS.Property.Height | CSS.Property.Width | string | number>
  borders?: Scale<CSS.Property.Border>
  borderStyles?: Scale<CSS.Property.Border>
  borderWidths?: Scale<CSS.Property.BorderWidth<string | 0 | number>>
  radii?: Scale<CSS.Property.BorderRadius<string | 0 | number>>
  shadows?: Scale<CSS.Property.BoxShadow>
  zIndices?: Scale<CSS.Property.ZIndex>
  colorStyles?: Scale<CSSProps>
  textStyles?: Scale<CSSProps>
  opacities?: Scale<CSS.Property.Opacity>
  transitions?: Scale<CSS.Property.Transition>
  /**
   * Define the colors that are available through this theme
   */
  colors?: {
    [k: string]: CSS.Property.Color | Scale<CSS.Property.Color> | undefined
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any
  components?: {
    [k: string]: StyleObject
  }
}

export type CSSAbsoluteUnit = 'cm' | 'mm' | 'in' | 'px' | 'pt' | 'pc'

export type CSSRelativeUnit =
  | 'em'
  | 'rem'
  | 'ex'
  | 'ch'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | '%'

export type CSSUnit = CSSAbsoluteUnit | CSSRelativeUnit

export type CSSPropAutocomplete<T extends string> = T | (string & {})
