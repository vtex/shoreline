import { csx } from '@vtex/admin-ui-core'
import type * as CSS from 'csstype'
import type { ResponsiveValue } from '@vtex/admin-ui-react'
import type React from 'react'

function generateCSSVars<T>(
  property: string,
  values?: ResponsiveValue<T>
): React.CSSProperties {
  const { mobile, tablet, desktop, widescreen } = values || {}

  return {
    [`--${property}-mobile`]: mobile,
    [`--${property}-tablet`]: tablet,
    [`--${property}-desktop`]: desktop,
    [`--${property}-widescreen`]: widescreen,
  }
}

export const flexStyle = (
  values: FlexResponsiveOptions
): React.CSSProperties => {
  return {
    ...generateCSSVars<CSS.Property.FlexBasis>('basis', values.basis),
    ...generateCSSVars<CSS.Property.FlexDirection>(
      'direction',
      values.direction
    ),
    ...generateCSSVars<CSS.Property.FlexWrap>('wrap', values.wrap),
    ...generateCSSVars<CSS.Property.AlignContent>('align', values.align),
    ...generateCSSVars<CSS.Property.JustifyContent>('justify', values.justify),
    ...generateCSSVars<CSS.Property.FlexGrow>('grow', values.grow),
    ...generateCSSVars<CSS.Property.FlexShrink>('shrink', values.shrink),
    ...generateCSSVars<CSS.Property.Order>('order', values.order),
  }
}

export const flexTheme = csx({
  display: 'flex',
  flexBasis: 'var(--basis-mobile)',
  flexDirection: 'var(--direction-mobile)' as CSS.Property.FlexDirection,
  flexWrap: 'var(--wrap-mobile)' as CSS.Property.FlexWrap,
  alignItems: 'var(--align-mobile)',
  justifyContent: 'var(--justify-mobile)',
  flexGrow: 'var(--grow-mobile)',
  flexShrink: 'var(--shrink-mobile)',
  order: 'var(--order-mobile)',
  '@tablet': {
    flexBasis: 'var(--basis-tablet)',
    flexDirection: 'var(--direction-tablet)' as CSS.Property.FlexDirection,
    flexWrap: 'var(--wrap-tablet)' as CSS.Property.FlexWrap,
    alignItems: 'var(--align-tablet)',
    justifyContent: 'var(--justify-tablet)',
    flexGrow: 'var(--grow-tablet)',
    flexShrink: 'var(--shrink-tablet)',
    order: 'var(--order-tablet)',
  },
  '@desktop': {
    flexBasis: 'var(--basis-desktop)',
    flexDirection: 'var(--direction-desktop)' as CSS.Property.FlexDirection,
    flexWrap: 'var(--wrap-desktop)' as CSS.Property.FlexWrap,
    alignItems: 'var(--align-desktop)',
    justifyContent: 'var(--justify-desktop)',
    flexGrow: 'var(--grow-desktop)',
    flexShrink: 'var(--shrink-desktop)',
    order: 'var(--order-desktop)',
  },
  '@widescreen': {
    flexBasis: 'var(--basis-widescreen)',
    flexDirection: 'var(--direction-widescreen)' as CSS.Property.FlexDirection,
    flexWrap: 'var(--wrap-widescreen)' as CSS.Property.FlexWrap,
    alignItems: 'var(--align-widescreen)',
    justifyContent: 'var(--justify-widescreen)',
    flexGrow: 'var(--grow-widescreen)',
    flexShrink: 'var(--shrink-widescreen)',
    order: 'var(--order-widescreen)',
  },
})

export interface FlexResponsiveOptions {
  /** Shorthand for CSS alignItems property */
  align?: ResponsiveValue<CSS.Property.AlignContent>
  /** Shorthand for CSS flexBasis property */
  basis?: ResponsiveValue<CSS.Property.FlexBasis>
  /** Shorthand for CSS flexDirection property */
  direction?: ResponsiveValue<CSS.Property.FlexDirection>
  /** Shorthand for CSS flexGrow property */
  grow?: ResponsiveValue<CSS.Property.FlexGrow>
  /** Shorthand for CSS flexShrink property */
  shrink?: ResponsiveValue<CSS.Property.FlexShrink>
  /** Shorthand for CSS justifyContent property */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>
  /** Shorthand for CSS flexWrap property */
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>
  /** Shorthand for CSS order property */
  order?: ResponsiveValue<CSS.Property.Order>
}

export const flexSpacerTheme = csx({
  flex: 1,
  justifySelf: 'stretch',
  alignSelf: 'stretch',
})
