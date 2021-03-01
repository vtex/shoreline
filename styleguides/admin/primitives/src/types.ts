import { StyleProp } from '@vtex/admin-core'

export interface SystemPrimitive {
  /**
   * styles
   * @default {}
   * @see https://admin-ui-docs.vercel.app/theming/style-object/
   */
  csx?: StyleProp
  /**
   * Fix to avoid ts errors
   */
  css?: any
}
