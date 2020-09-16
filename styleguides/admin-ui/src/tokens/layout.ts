import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { Sizes } from '../theme/theme'

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
  size: {
    properties: ['width', 'height'],
    scale: 'sizes',
  },
  position: true,
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
})

export interface LayoutTokensProps {
  display?: ResponsiveValue<CSS.Property.Display>
  position?: ResponsiveValue<CSS.Property.Position>
  overflow?: ResponsiveValue<CSS.Property.Overflow>
  overflowX?: ResponsiveValue<CSS.Property.OverflowX>
  overflowY?: ResponsiveValue<CSS.Property.OverflowY>
  verticalAlign?: ResponsiveValue<CSS.Property.VerticalAlign>
  /**
   * Width
   */
  w?: Sizes
  /**
   * Min width
   */
  minW?: Sizes
  /**
   * max width
   */
  maxW?: Sizes
  /**
   * Height
   */
  h?: Sizes
  /**
   * Min height
   */
  minH?: Sizes
  /**
   * Max height
   */
  maxH?: Sizes
  /**
   * width + height
   */
  size?: Sizes
}
