import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { Sizes } from '../theme/config'

export const layoutTokens = system({
  w: {
    property: 'width',
    scale: 'sizes',
  },
  minW: {
    property: 'minWidth',
    scale: 'sizes',
  },
  maxW: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  h: {
    property: 'height',
    scale: 'sizes',
  },
  minH: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxH: {
    property: 'maxHeight',
    scale: 'sizes',
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
  w?: ResponsiveValue<Sizes>
  /**
   * Min width
   */
  minW?: ResponsiveValue<Sizes>
  /**
   * max width
   */
  maxW?: ResponsiveValue<Sizes>
  /**
   * Height
   */
  h?: ResponsiveValue<Sizes>
  /**
   * Min height
   */
  minH?: ResponsiveValue<Sizes>
  /**
   * Max height
   */
  maxH?: ResponsiveValue<Sizes>
}
