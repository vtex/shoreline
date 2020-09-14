import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { theme } from '../theme/theme'

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
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
})

type Sizes = keyof typeof theme.sizes

export interface LayoutTokensProps {
  display?: ResponsiveValue<CSS.Property.Display>
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
