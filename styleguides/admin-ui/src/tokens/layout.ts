import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { theme } from '../theme/theme'

export const layoutTokens = system({
  width: {
    property: 'width',
    scale: 'sizes',
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  height: {
    property: 'height',
    scale: 'sizes',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxHeight: {
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
  width?: Sizes
  minWidth?: Sizes
  maxWidth?: Sizes
  height?: Sizes
  minHeight?: Sizes
  maxHeight?: Sizes
  size?: Sizes
}
