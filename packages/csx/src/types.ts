import type * as CSSType from 'csstype'

import type {
  bgTokens,
  radiiTokens,
  borderTokens,
  colorTokens,
  zTokens,
  fgTokens,
  shadowTokens,
  spaceTokens,
  textTokens,
} from './tokens-as-ts-literals'

export type Foundation =
  | 'bg'
  | 'fg'
  | 'color'
  | 'border'
  | 'radii'
  | 'bp'
  | 'shadow'
  | 'z'
  | 'space'
  | 'ff'
  | 'fs'
  | 'fw'
  | 'lh'
  | 'ls'

export type FoundationDictionary = Record<string, Foundation>

export type Mixin = (value: string | number) => Record<string, string | number>

export type MixinDictionary = Record<string, Mixin>

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

export type CSSValueWithUnit = `${string}${CSSUnit}`

type ColorTokens = typeof colorTokens[number]
type FgTokens = typeof fgTokens[number]
type BgTokens = typeof bgTokens[number]
type BorderTokens = typeof borderTokens[number]
type ShadowTokens = typeof shadowTokens[number]
type TextTokens = typeof textTokens[number]
type SpaceTokens = typeof spaceTokens[number]
type ZTokens = typeof zTokens[number]
type RadiiTokens = typeof radiiTokens[number]

type CSSPropAutocomplete<T extends string> = T | (string & {})

interface BeachfrontCustomProperties {
  /**
   * Shorthand for backgroundColor
   */
  bg?: CSSPropAutocomplete<BgTokens> | CSSType.Property.Background
  /**
   * Shorthand for color
   */
  fg?: CSSPropAutocomplete<FgTokens> | CSSType.Property.Color
  /**
   * Shorthand for marginLeft & marginRight
   */
  marginX?:
    | CSSPropAutocomplete<SpaceTokens>
    | CSSType.Property.MarginLeft
    | number
  /**
   * Shorthand for marginTop & marginBottom
   */
  marginY?:
    | CSSPropAutocomplete<SpaceTokens>
    | CSSType.Property.MarginTop
    | number
  /**
   * Shorthand for paddingLeft & paddingRight
   */
  paddingX?:
    | CSSPropAutocomplete<SpaceTokens>
    | CSSType.Property.PaddingLeft
    | number
  /**
   * Shorthand for paddingTop & paddingBottom
   */
  paddingY?:
    | CSSPropAutocomplete<SpaceTokens>
    | CSSType.Property.PaddingTop
    | number
  /**
   * Shorthand for width & height
   */
  size?: CSSType.Property.Width | CSSType.Property.Height | number
  /**
   * Shorthand for zIndex
   */
  z?: CSSPropAutocomplete<ZTokens> | CSSType.Property.ZIndex
  /**
   * Shorthand for border-radius
   */
  radii?: CSSPropAutocomplete<RadiiTokens> | CSSType.Property.BorderRadius
  /**
   * Shoreline available text patterns
   */
  text?: CSSPropAutocomplete<TextTokens>
  /**
   * Tablet media query
   */
  '@tablet'?: CsxObject
  /**
   * Desktop media query
   */
  '@desktop'?: CsxObject
  /**
   * Widescreen media query
   */
  '@widescreen'?: CsxObject
}

interface OverwritenCSSProperties {
  /**
   * CSS **`color`** property
   * @default currentColor
   */
  color?: CSSPropAutocomplete<FgTokens | CSSType.Property.Color>
  /**
   * CSS **`backgroundColor`** property
   * @default transparent
   */
  background?: CSSPropAutocomplete<BgTokens | CSSType.Property.BackgroundColor>
  /**
   * CSS **`border`** property
   * @default currentColor
   */
  border?: CSSPropAutocomplete<BorderTokens | CSSType.Property.BorderColor>
  /**
   * CSS **`caretColor`** property
   * @default currentColor
   */
  caretColor?: CSSPropAutocomplete<ColorTokens | CSSType.Property.CaretColor>
  /**
   * CSS **`columnRuleColor`** property
   * @default currentColor
   */
  columnRuleColor?: CSSPropAutocomplete<
    ColorTokens | CSSType.Property.ColumnRuleColor
  >
  /**
   * CSS **`borderTopColor`** property
   * @default currentColor
   */
  borderTopColor?: CSSPropAutocomplete<
    BorderTokens | CSSType.Property.BorderTopColor
  >
  /**
   * CSS **`borderBottomColor`** property
   * @default currentColor
   */
  borderBottomColor?: CSSPropAutocomplete<
    BorderTokens | CSSType.Property.BorderBottomColor
  >
  /**
   * CSS **`borderLeftColor`** property
   * @default currentColor
   */
  borderLeftColor?: CSSPropAutocomplete<
    BorderTokens | CSSType.Property.BorderLeftColor
  >
  /**
   * CSS **`borderRightColor`** property
   * @default currentColor
   */
  borderRightColor?: CSSPropAutocomplete<
    BorderTokens | CSSType.Property.BorderRightColor
  >
  /**
   * CSS **`outlineColor`** property
   * @default currentColor
   */
  outlineColor?: CSSPropAutocomplete<
    ColorTokens | CSSType.Property.OutlineColor
  >
  /**
   * CSS **`fill`** property
   * @default currentColor
   */
  fill?: CSSPropAutocomplete<ColorTokens | CSSType.Property.Fill>
  /**
   * CSS **`stroke`** property
   * @default currentColor
   */
  stroke?: CSSPropAutocomplete<ColorTokens | CSSType.Property.Stroke>
  /**
   * CSS **`box-shadow`** property
   * @default none
   */
  boxShadow?: CSSPropAutocomplete<ShadowTokens | CSSType.Property.BoxShadow>
  /**
   * CSS **`border-top-style`** property
   * @default none
   */
  borderTopStyle?: CSSPropAutocomplete<CSSType.Property.BorderTopStyle>
  /**
   * CSS **`border-top-width`** property
   * @default medium
   */
  borderTopWidth?: CSSPropAutocomplete<CSSType.Property.BorderTopWidth<never>>
  /**
   * CSS **`border-bottom-style`** property
   * @default none
   */
  borderBottomStyle?: CSSPropAutocomplete<CSSType.Property.BorderBottomStyle>
  /**
   * CSS **`border-right-style`** property
   * @default none
   */
  borderRightStyle?: CSSPropAutocomplete<CSSType.Property.BorderRightStyle>
  /**
   * CSS **`border-left-style`** property
   * @default none
   */
  borderLeftStyle?: CSSPropAutocomplete<CSSType.Property.BorderLeftStyle>
  /**
   * CSS **`border-radius`** property
   */
  borderRadius?:
    | CSSType.Property.BorderRadius<string | number>
    | CSSPropAutocomplete<RadiiTokens>
  /**
   * CSS **`z-index`** property
   * @default auto
   */
  zIndex?: CSSPropAutocomplete<ZTokens> | CSSType.Property.ZIndex
  /**
   * CSS **padding** property
   */
  padding?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **paddingTop** property
   */
  paddingTop?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **paddingBottom** property
   */
  paddingBottom?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **paddingLeft** property
   */
  paddingLeft?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **paddingRight** property
   */
  paddingRight?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **margin** property
   */
  margin?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **marginTop** property
   */
  marginTop?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **marginBottom** property
   */
  marginBottom?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **marginLeft** property
   */
  marginLeft?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
  /**
   * CSS **marginRight** property
   */
  marginRight?: CSSPropAutocomplete<SpaceTokens> | CSSType.Globals | number
}

type CSSProperties = CSSType.StandardProperties<number | string> &
  CSSType.SvgProperties<number | string> &
  CSSType.VendorProperties<number | string>

type CSSPseudoSelectorProps = { [K in CSSType.Pseudos]?: CsxObject }

type ExtendedCSSProperties =
  | Omit<CSSProperties, keyof OverwritenCSSProperties>
  | BeachfrontCustomProperties
  | OverwritenCSSProperties

interface UnsafeNestingProps {
  [k: string]: CsxObject
}

export type CsxObject =
  | ExtendedCSSProperties
  | CSSPseudoSelectorProps
  | UnsafeNestingProps
