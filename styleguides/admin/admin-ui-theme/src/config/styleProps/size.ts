import { ResponsiveValue } from '@vtex/admin-ui-system'

import { sizes } from '../base'

type Size = keyof typeof sizes

export interface SizeStyleProps {
  width?: ResponsiveValue<Size | string | number>
  height?: ResponsiveValue<Size | string | number>
  minWidth?: ResponsiveValue<Size | string | number>
  maxWidth?: ResponsiveValue<Size | string | number>
  minHeight?: ResponsiveValue<Size | string | number>
  maxHeight?: ResponsiveValue<Size | string | number>
}
