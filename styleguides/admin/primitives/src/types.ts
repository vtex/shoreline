import { StyleProp } from '@vtex/admin-core'

export interface SystemPrimitive {
  /**
   * define component styles
   * @default {}
   * @see https://admin-ui-docs.vercel.app/theming/style-object/
   */
  csx?: StyleProp
  /**
   * Emotion css prop
   */
  css?: any
}
