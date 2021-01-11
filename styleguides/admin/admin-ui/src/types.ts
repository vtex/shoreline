import { StyleProp } from '@vtex/admin-ui-system'

export interface Overridable {
  /** Override theme styles */
  styleOverrides?: StyleProp
}

export type OmitNotAllowedProps<T> = Omit<T, 'className' | 'color' | 'style'>
