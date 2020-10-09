import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { Space, ZIndexes } from '../theme/config'

export const positionTokens = system({
  position: true,
  z: {
    property: 'zIndex',
    scale: 'zIndexes',
  },
  top: {
    property: 'top',
    scale: 'space',
  },
  right: {
    property: 'right',
    scale: 'space',
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
  },
  left: {
    property: 'left',
    scale: 'space',
  },
})

export interface PositionTokensProps {
  position?: ResponsiveValue<CSS.Property.Position>
  z?: ResponsiveValue<ZIndexes>
  top?: ResponsiveValue<Space>
  right?: ResponsiveValue<Space>
  bottom?: ResponsiveValue<Space>
  left?: ResponsiveValue<Space>
}
