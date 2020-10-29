import { ResponsiveValue } from '@vtex/admin-ui-system'

import { space } from '../base'

type Space = keyof typeof space

export interface SpaceStyleProps {
  padding?: ResponsiveValue<Space>
  paddingX?: ResponsiveValue<Space>
  paddingY?: ResponsiveValue<Space>
  paddingTop?: ResponsiveValue<Space>
  paddingRight?: ResponsiveValue<Space>
  paddingBottom?: ResponsiveValue<Space>
  paddingLeft?: ResponsiveValue<Space>
  margin?: ResponsiveValue<Space | 'auto'>
  marginY?: ResponsiveValue<Space | 'auto'>
  marginX?: ResponsiveValue<Space | 'auto'>
  marginTop?: ResponsiveValue<Space | 'auto'>
  marginRight?: ResponsiveValue<Space | 'auto'>
  marginBottom?: ResponsiveValue<Space | 'auto'>
  marginLeft?: ResponsiveValue<Space | 'auto'>
}
