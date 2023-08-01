import type {
  StandardProperties,
  SvgProperties,
  VendorProperties,
  Pseudos as CSSPseudoSelectors,
  Property as CSSProperty,
  Globals as CSSGlobals,
} from 'csstype'

export type { CSSProperty, CSSPseudoSelectors, CSSGlobals }

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

export type CSSValueAutocomplete<T extends string> = T | (string & {})

export type CSSProperties = StandardProperties<number | string> &
  SvgProperties<number | string> &
  VendorProperties<number | string>
