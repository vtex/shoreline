import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'
import { get } from '@vtex-components/theme'

import { Sizes, theme } from './theme/config'

function transformSize(value: string | number) {
  if (typeof value === 'string' && Object.keys(theme.sizes).includes(value)) {
    return get(theme.sizes, value)
  }

  return Number(value)
}

export const layoutTokens = system({
  w: {
    property: 'width',
    transform: transformSize,
  },
  minW: {
    property: 'minWidth',
    transform: transformSize,
  },
  maxW: {
    property: 'maxWidth',
    transform: transformSize,
  },
  h: {
    property: 'height',
    transform: transformSize,
  },
  minH: {
    property: 'minHeight',
    transform: transformSize,
  },
  maxH: {
    property: 'maxHeight',
    transform: transformSize,
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
})

export interface LayoutTokensProps {
  display?: ResponsiveValue<CSS.Property.Display>
  overflow?: ResponsiveValue<CSS.Property.Overflow>
  overflowX?: ResponsiveValue<CSS.Property.OverflowX>
  overflowY?: ResponsiveValue<CSS.Property.OverflowY>
  verticalAlign?: ResponsiveValue<CSS.Property.VerticalAlign>
  /**
   * Width
   */
  w?: ResponsiveValue<Sizes | number>
  /**
   * Min width
   */
  minW?: ResponsiveValue<Sizes | number>
  /**
   * max width
   */
  maxW?: ResponsiveValue<Sizes | number>
  /**
   * Height
   */
  h?: ResponsiveValue<Sizes | number>
  /**
   * Min height
   */
  minH?: ResponsiveValue<Sizes | number>
  /**
   * Max height
   */
  maxH?: ResponsiveValue<Sizes | number>
}
