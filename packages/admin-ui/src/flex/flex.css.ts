import { csx } from '@vtex/admin-ui-core'
import type * as CSS from 'csstype'
import type { ResponsiveValue } from '@vtex/admin-ui-react'

export const flexStyle = (values: FlexResponsiveOptions) => {
  return {
    '--basis-mobile': values.basis?.mobile,
    '--basis-tablet': values.basis?.tablet,
    '--basis-desktop': values.basis?.desktop,
    '--basis-widescreen': values.basis?.widescreen,
    '--direction-mobile': values.direction?.mobile,
    '--direction-tablet': values.direction?.tablet,
    '--direction-desktop': values.direction?.desktop,
    '--direction-widescreen': values.direction?.widescreen,
    '--wrap-mobile': values.wrap?.mobile,
    '--wrap-tablet': values.wrap?.tablet,
    '--wrap-desktop': values.wrap?.desktop,
    '--wrap-widescreen': values.wrap?.widescreen,
    '--align-mobile': values.align?.mobile,
    '--align-tablet': values.align?.tablet,
    '--align-desktop': values.align?.desktop,
    '--align-widescreen': values.align?.widescreen,
    '--justify-mobile': values.justify?.mobile,
    '--justify-tablet': values.justify?.tablet,
    '--justify-desktop': values.justify?.desktop,
    '--justify-widescreen': values.justify?.widescreen,
    '--grow-mobile': values.grow?.mobile,
    '--grow-tablet': values.grow?.tablet,
    '--grow-desktop': values.grow?.desktop,
    '--grow-widescreen': values.grow?.widescreen,
    '--shrink-mobile': values.shrink?.mobile,
    '--shrink-tablet': values.shrink?.tablet,
    '--shrink-desktop': values.shrink?.desktop,
    '--shrink-widescreen': values.shrink?.widescreen,
    '--order-mobile': values.order?.mobile,
    '--order-tablet': values.order?.tablet,
    '--order-desktop': values.order?.desktop,
    '--order-widescreen': values.order?.widescreen,
  } as React.CSSProperties
}

export const flexTheme = csx({
  display: 'flex',
  flexBasis: 'var(--basis-mobile)',
  flexDirection: 'var(--direction-mobile)' as any,
  flexWrap: 'var(--wrap-mobile)' as any,
  alignItems: 'var(--align-mobile)',
  justifyContent: 'var(--justify-mobile)',
  flexGrow: 'var(--grow-mobile)',
  flexShrink: 'var(--shrink-mobile)',
  order: 'var(--order-mobile)',
  '@tablet': {
    flexBasis: 'var(--basis-tablet)',
    flexDirection: 'var(--direction-tablet)',
    flexWrap: 'var(--wrap-tablet)',
    alignItems: 'var(--align-tablet)',
    justifyContent: 'var(--justify-tablet)',
    flexGrow: 'var(--grow-tablet)',
    flexShrink: 'var(--shrink-tablet)',
    order: 'var(--order-tablet)',
  },
  '@desktop': {
    flexBasis: 'var(--basis-desktop)',
    flexDirection: 'var(--direction-desktop)',
    flexWrap: 'var(--wrap-desktop)',
    alignItems: 'var(--align-desktop)',
    justifyContent: 'var(--justify-desktop)',
    flexGrow: 'var(--grow-desktop)',
    flexShrink: 'var(--shrink-desktop)',
    order: 'var(--order-desktop)',
  },
  '@widescreen': {
    flexBasis: 'var(--basis-widescreen)',
    flexDirection: 'var(--direction-widescreen)',
    flexWrap: 'var(--wrap-widescreen)',
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
