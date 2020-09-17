import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { Space } from '../theme/theme'

export const gridTokens = system({
  gridGap: {
    property: 'gridGap',
    scale: 'space',
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'space',
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'space',
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
})

export interface GridTokensProps {
  gridGap?: Space
  gridColumnGap?: Space
  gridRowGap?: Space
  gridColumn?: ResponsiveValue<CSS.Property.Display>
  gridRow?: ResponsiveValue<CSS.Property.Display>
  gridAutoFlow?: ResponsiveValue<CSS.Property.Display>
  gridAutoColumns?: ResponsiveValue<CSS.Property.Display>
  gridAutoRows?: ResponsiveValue<CSS.Property.Display>
  gridTemplateColumns?: ResponsiveValue<CSS.Property.Display>
  gridTemplateRows?: ResponsiveValue<CSS.Property.Display>
  gridTemplateAreas?: ResponsiveValue<CSS.Property.Display>
  gridArea?: ResponsiveValue<CSS.Property.Display>
}
