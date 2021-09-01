import type { StyleProp } from '@vtex/admin-ui-core'

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

export type SystemComponent = SystemPrimitive
export type SystemComponentProps<T> = SystemPrimitive & OmitNotAllowedProps<T>
export type OmitNotAllowedProps<T> = Omit<T, 'className' | 'color' | 'style'>
