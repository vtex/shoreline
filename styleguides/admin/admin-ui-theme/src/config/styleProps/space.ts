import { ResponsiveValue } from '@vtex/admin-ui-system'

import { space } from '../base'

type Space = keyof typeof space

export interface SpaceStyleProps {
  padding?: ResponsiveValue<Space>
  margin?: ResponsiveValue<Space | 'auto'>
  marginY?: ResponsiveValue<Space | 'auto'>
  marginX?: ResponsiveValue<Space | 'auto'>
}
