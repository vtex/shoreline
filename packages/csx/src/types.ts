import type {
  CSSValueAutocomplete,
  CSSProperties,
  CSSProperty,
  CSSPseudoSelectors,
} from '@vtex/shoreline-utils'

type Token = ''

type TokenAutocomplete = CSSValueAutocomplete<Token>

interface CsxObjectGenericNesting {
  [key: string]: CsxObject
}

interface CsxNamepaces {
  '@media'?:
    | {
        tablet?: CsxObject
        desktop?: CsxObject
        widescreen?: CsxObject
        darkMode?: CsxObject
      }
    | CsxObjectGenericNesting
  '@layer'?:
    | {
        reset?: CsxObject
        base?: CsxObject
        tokens?: CsxObject
        components?: CsxObject
      }
    | CsxObjectGenericNesting
}

interface ShorelineCustomProperties {
  /**
   * Shorthand for backgroundColor
   */
  bg?: TokenAutocomplete | CSSProperty.Background
  /**
   * Shorthand for color
   */
  fg?: TokenAutocomplete | CSSProperty.Color
  /**
   * Shorthand for marginLeft & marginRight
   */
  marginX?: TokenAutocomplete | CSSProperty.MarginLeft | number
  /**
   * Shorthand for marginTop & marginBottom
   */
  marginY?: TokenAutocomplete | CSSProperty.MarginTop | number
  /**
   * Shorthand for paddingLeft & paddingRight
   */
  paddingX?: TokenAutocomplete | CSSProperty.PaddingLeft | number
  /**
   * Shorthand for paddingTop & paddingBottom
   */
  paddingY?: TokenAutocomplete | CSSProperty.PaddingTop | number
  /**
   * Shorthand for width & height
   */
  size?: TokenAutocomplete | CSSProperty.Width | CSSProperty.Height | number
  /**
   * Shorthand for zIndex
   */
  z?: TokenAutocomplete | CSSProperty.ZIndex
  /**
   * Shorthand for border-radius
   */
  radii?: TokenAutocomplete | CSSProperty.BorderRadius
  /**
   * Shoreline available text patterns
   */
  text?: TokenAutocomplete
}

type ExtendedProperties = {
  [K in keyof CSSProperties]: CSSProperties[K] | TokenAutocomplete
}

type CSSPseudoSelectorProps = { [K in CSSPseudoSelectors]?: CsxObject }

interface UnsafeNestingProps {
  [k: string]: CsxObject
}

interface UnsafeCSSValues {
  [k: string]: string | number
}

export type CsxObject =
  | ShorelineCustomProperties
  | ExtendedProperties
  | CSSPseudoSelectorProps
  | UnsafeNestingProps
  | UnsafeCSSValues
  | CsxNamepaces
