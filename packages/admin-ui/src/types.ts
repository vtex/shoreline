import type { StyleProp } from '@vtex/admin-ui-core'
import type { CsxCall } from '@vtex/admin-ui-react'

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

type IconSize = 'regular' | 'small'

declare module '@vtex/phosphor-icons' {
  export interface IconOptions extends CsxCall {
    size?: IconSize
  }
}

export interface IsInput {
  /** Whether the input is disabled. */
  isDisabled?: boolean
  /** Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean
}
