import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'
import { csx, negative, theme } from '@vtex/admin-ui-core'

function runtimeNegative(token: string) {
  return negative(token)(theme, 'margin')
}

export const bleedStyle = (values: Required<BleedThemeValues>) => ({
  '--bleed-top': runtimeNegative(values.top),
  '--bleed-right': runtimeNegative(values.right),
  '--bleed-bottom': runtimeNegative(values.bottom),
  '--bleed-left': runtimeNegative(values.left),
})

export const bleedTheme = csx({
  marginTop: 'var(--bleed-top, 0)',
  marginLeft: 'var(--bleed-left, 0)',
  marginBottom: 'var(--bleed-bottom, 0)',
  marginRight: 'var(--bleed-right, 0)',
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
