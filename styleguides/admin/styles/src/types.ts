import * as CSS from 'csstype'

type StandardCSSProperties = CSS.Properties<number | string>
/**
 * The `styles` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 *
 * For more information see: https://styled-system.com/responsive-styles
 */
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

export type Colors =
  | 'dark.primary'
  | 'dark.secondary'
  | 'light.primary'
  | 'light.secondary'
  | 'mid.primary'
  | 'mid.secondary'
  | 'mid.tertiary'
  | 'focus'
  | 'blue'
  | 'blue.default'
  | 'blue.hover'
  | 'blue.pressed'
  | 'blue.secondary.default'
  | 'blue.secondary.hover'
  | 'blue.secondary.pressed'
  | 'red.default'
  | 'red.hover'
  | 'red.pressed'
  | 'red.secondary.default'
  | 'red.secondary.hover'
  | 'red.secondary.pressed'
  | 'green.default'
  | 'green.hover'
  | 'green.pressed'
  | 'green.secondary.default'
  | 'green.secondary.hover'
  | 'green.secondary.pressed'
  | 'yellow.default'
  | 'yellow.hover'
  | 'yellow.pressed'
  | 'yellow.secondary.default'
  | 'yellow.secondary.hover'
  | 'yellow.secondary.pressed'

interface AliasesCSSProperties {
  /**
   * Shorthand for backgroundColor
   * @default transparent
   */
  bg?: Colors | StandardCSSProperties['backgroundColor']
  /**
   * Shorthand for marginLeft & marginRight
   * @default 0
   */
  marginX?: StandardCSSProperties['marginLeft']
  /**
   * Shorthand for marginTop & marginBottom
   * @default 0
   */
  marginY?: StandardCSSProperties['marginTop']
  /**
   * Shorthand for paddingLeft & paddingRight
   * @default 0
   */
  paddingX?: StandardCSSProperties['paddingLeft']
  /**
   * Shorthand for paddingTop & paddingBottom
   * @default 0
   */
  paddingY?: StandardCSSProperties['paddingTop']
  /**
   * Shorthand for width & height
   */
  size?: StandardCSSProperties['width']
  /**
   * Admin-ui available text patterns
   */
  text?:
    | 'code'
    | 'small'
    | 'body'
    | 'highlight'
    | 'action'
    | 'subtitle'
    | 'headline'
  /**
   * Shorthand for fontVariationSettings
   */
  fontSettings?:
    | 'hairline'
    | 'thin'
    | 'light'
    | 'regular'
    | 'medium'
    | 'bold'
    | 'black'
    | StandardCSSProperties['fontVariationSettings']
}

interface OverwriteCSSProperties {
  /**
   * CSS **`color`** property
   * @default currentColor
   */
  color?: Colors | CSS.Property.Color
  /**
   * CSS **`backgroundColor`** property
   * @default transparent
   */
  backgroundColor?: Colors | CSS.Property.BackgroundColor
  /**
   * CSS **`borderColor`** property
   * @default currentColor
   */
  borderColor?: Colors | CSS.Property.BorderColor
  /**
   * CSS **`caretColor`** property
   * @default currentColor
   */
  caretColor?: Colors | CSS.Property.CaretColor
  /**
   * CSS **`columnRuleColor`** property
   * @default currentColor
   */
  columnRuleColor?: Colors | CSS.Property.ColumnRuleColor
  /**
   * CSS **`borderTopColor`** property
   * @default currentColor
   */
  borderTopColor?: Colors | CSS.Property.BorderTopColor
  /**
   * CSS **`borderBottomColor`** property
   * @default currentColor
   */
  borderBottomColor?: Colors | CSS.Property.BorderBottomColor
  /**
   * CSS **`borderLeftColor`** property
   * @default currentColor
   */
  borderLeftColor?: Colors | CSS.Property.BorderLeftColor
  /**
   * CSS **`borderRightColor`** property
   * @default currentColor
   */
  borderRightColor?: Colors | CSS.Property.BorderRightColor
  /**
   * CSS **`outlineColor`** property
   * @default currentColor
   */
  outlineColor?: Colors | CSS.Property.OutlineColor
  /**
   * CSS **`fill`** property
   * @default currentColor
   */
  fill?: Colors | CSS.Property.Fill
  /**
   * CSS **`stroke`** property
   * @default currentColor
   */
  stroke?: Colors | CSS.Property.Stroke
  /**
   * CSS **`box-shadow`** property
   * @default none
   */
  boxShadow?: CSS.Property.BoxShadow | number
  /**
   * CSS **`font-weight`** property
   * @default normal
   * @deprecated use fontSettings instead
   */
  fontWeight?: CSS.Property.FontWeight | string
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
   * CSS **`font-family`** property
   * @default inherit
   */
  fontFamily?: 'inherit' | 'mono' | 'sans' | string
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
  | ((theme: Theme) => ResponsiveStyleValue<Exclude<T, undefined>> | undefined)
  | StyleProp

export type CSSProps = {
  [K in keyof ExtendedCSSProps]: StylePropertyValue<ExtendedCSSProps[K]>
}

export interface ThemeKeyProp {
  /**
   * **`themeKey`** is used to consume complex object styles.
   *
   * @example
   * const theme = {
   *   components.button: {
   *     primary: {
   *       padding: 3,
   *       color: 'white',
   *       bg: 'primary',
   *       borderRadius: 'default',
   *     },
   *   },
   * }
   *
   * const result = styles({
   *   themeKey: 'components.button.primary',
   * })(theme)
   */
  themeKey?: string | Record<string, Record<string, string>>
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
  ThemeKeyProp

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

export type WithStyles<P> = P & {
  styles?: StyleProp
}

export type CssPropsArgument = { theme: Theme } | Theme

export type ResponsiveValue<T> = T | T[]
