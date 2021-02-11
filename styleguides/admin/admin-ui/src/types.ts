import { StyleProp } from '@vtex/admin-core'

export interface Overridable {
  /**
   * override default component styles
   * @default {}
   * @see https://admin-ui-docs.vercel.app/theming/style-object/
   */
  styleOverrides?: StyleProp
}

export interface WithCSS {
  /** Fix to avoid ts errors */
  css?: any
}

export type SystemComponent = WithCSS & Overridable

export type SystemComponentProps<T> = WithCSS &
  Overridable &
  OmitNotAllowedProps<T>

export interface SystemPrimitive extends WithCSS {
  /**
   * styles
   * @default {}
   * @see https://admin-ui-docs.vercel.app/theming/style-object/
   */
  styles?: StyleProp
}

export type OmitNotAllowedProps<T> = Omit<T, 'className' | 'color' | 'style'>
