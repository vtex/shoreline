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
  gridGap?: ResponsiveValue<Space>
  gridColumnGap?: ResponsiveValue<Space>
  gridRowGap?: ResponsiveValue<Space>
  gridColumn?: ResponsiveValue<CSS.Property.GridColumn>
  gridRow?: ResponsiveValue<CSS.Property.GridRow>
  gridAutoFlow?: ResponsiveValue<CSS.Property.GridAutoFlow>
  gridAutoColumns?: ResponsiveValue<CSS.Property.GridAutoColumns>
  gridAutoRows?: ResponsiveValue<CSS.Property.GridAutoRows>
  gridTemplateColumns?: ResponsiveValue<CSS.Property.GridTemplateColumns>
  gridTemplateRows?: ResponsiveValue<CSS.Property.GridTemplateRows>
  gridTemplateAreas?: ResponsiveValue<CSS.Property.GridTemplateAreas>
  gridArea?: ResponsiveValue<CSS.Property.GridArea>
}
