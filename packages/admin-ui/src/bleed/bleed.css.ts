import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'
import { csx, negative } from '@vtex/admin-ui-core'

export const bleedTheme = (values: Required<BleedThemeValues>) =>
  csx({
    marginTop: negative(values.top),
    marginLeft: negative(values.left),
    marginBottom: negative(values.bottom),
    marginRight: negative(values.right),
  })

export const bleedInnerChild = csx({ position: 'relative' })

export interface BleedThemeValues {
  /**
   * Top bleed
   * @default 0
   */
  top?: CSSPropAutocomplete<SpaceTokens>
  /**
   * Bottom bleed
   * @default 0
   */
  bottom?: CSSPropAutocomplete<SpaceTokens>
  /**
   * Left bleed
   * @default 0
   */
  left?: CSSPropAutocomplete<SpaceTokens>
  /**
   * Right bleed
   * @default 0
   */
  right?: CSSPropAutocomplete<SpaceTokens>
}
