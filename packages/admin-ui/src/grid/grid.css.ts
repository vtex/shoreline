import { csx } from '@vtex/admin-ui-core'
import type * as CSS from 'csstype'

import type { ResponsiveProp, ResponsiveValue } from '@vtex/admin-ui-react'
import { get } from '@vtex/admin-ui-util'

function generateCSSVars<T>(
  property: string,
  values?: ResponsiveValue<T>
): React.CSSProperties {
  const { mobile, tablet, desktop, widescreen } = values || {}

  return {
    [`--${property}-mobile`]: toString(mobile),
    [`--${property}-tablet`]: toString(tablet),
    [`--${property}-desktop`]: toString(desktop),
    [`--${property}-widescreen`]: toString(widescreen),
  }
}

export function toResponsiveObject<T>(
  responsiveValue?: ResponsiveProp<T>
): ResponsiveValue<T> {
  if (!responsiveValue) return responsiveValue as any

  const mobile = get(responsiveValue, 'mobile', responsiveValue)
  const tablet = get(responsiveValue, 'tablet', mobile)
  const desktop = get(responsiveValue, 'desktop', tablet)
  const widescreen = get(responsiveValue, 'widescreen', desktop)

  return {
    mobile,
    tablet,
    desktop,
    widescreen,
  }
}

function toString<T>(value: T) {
  if (!Array.isArray(value)) return value

  return value.map((value) => `"${value}"`).join(' ')
}

interface GridResponsiveOptions {
  gap?: ResponsiveValue<CSS.Property.GridGap>
  rowGap?: ResponsiveValue<CSS.Property.GridRowGap>
  columnGap?: ResponsiveValue<CSS.Property.GridColumnGap>
  templateAreas?: ResponsiveValue<string[]>
  templateRows?: ResponsiveValue<CSS.Property.GridTemplateRows>
  templateColumns?: ResponsiveValue<CSS.Property.GridTemplateColumns>
}

export const gridStyle = (
  values: GridResponsiveOptions
): React.CSSProperties => {
  return {
    ...generateCSSVars('gap', values.gap),
    ...generateCSSVars('rowGap', values.rowGap),
    ...generateCSSVars('columnGap', values.columnGap),
    ...generateCSSVars('templateAreas', values.templateAreas),
    ...generateCSSVars('templateRows', values.templateRows),
    ...generateCSSVars('templateColumns', values.templateColumns),
  }
}

export const gridTheme = csx({
  display: 'grid',
  gridGap: 'var(--gap-mobile)',
  gridRowGap: 'var(--rowGap-mobile)',
  gridColumnGap: 'var(--columnGap-mobile)',
  gridTemplateAreas: 'var(--templateAreas-mobile)',
  gridTemplateRows: 'var(--templateRows-mobile)',
  gridTemplateColumns: 'var(--templateColumns-mobile)',
  '@tablet': {
    gap: 'var(--gap-tablet)',
    gridRowGap: 'var(--rowGap-tablet)',
    gridColumnGap: 'var(--columnGap-tablet)',
    gridTemplateAreas: 'var(--templateAreas-tablet)',
    gridTemplateRows: 'var(--templateRows-tablet)',
    gridTemplateColumns: 'var(--templateColumns-tablet)',
  },
  '@desktop': {
    gap: 'var(--gap-desktop)',
    gridRowGap: 'var(--rowGap-desktop)',
    gridColumnGap: 'var(--columnGap-desktop)',
    gridTemplateAreas: 'var(--templateAreas-desktop)',
    gridTemplateRows: 'var(--templateRows-desktop)',
    gridTemplateColumns: 'var(--templateColumns-desktop)',
  },
  '@widescreen': {
    gap: 'var(--gap-widescreen)',
    gridRowGap: 'var(--rowGap-widescreen)',
    gridColumnGap: 'var(--columnGap-widescreen)',
    gridTemplateAreas: 'var(--templateAreas-widescreen)',
    gridTemplateRows: 'var(--templateRows-widescreen)',
    gridTemplateColumns: 'var(--templateColumns-widescreen)',
  },
})

interface GridItemResponsiveOptions {
  area?: ResponsiveValue<CSS.Property.GridArea>
}

export const gridItemStyle = (
  values: GridItemResponsiveOptions
): React.CSSProperties => {
  return {
    ...generateCSSVars('area', values.area),
  }
}

export const gridItemTheme = csx({
  gridArea: 'var(--area-mobile)',
  '@tablet': {
    gridArea: 'var(--area-tablet)',
  },
  '@desktop': {
    gridArea: 'var(--area-desktop)',
  },
  '@widescreen': {
    gridArea: 'var(--area-widescreen)',
  },
})
