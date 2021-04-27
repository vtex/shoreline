import { IconProps } from 'styleguides/admin/admin-ui-icons/dist'
import { SystemComponent } from '../../../types'

export interface ToastManagerState {
  /**
   * Position where the toasts are rendered
   */
  bottom: ToastOptions[]
}

export interface ToastOptions extends ToastProps {
  /**
   * Every toast needs an ID in order to
   * be identified on the stack.
   */
  id: string
  /**
   * Removes toast from the stack.
   */
  remove: (id: string) => void
}

export interface ToastManagerProps {
  actions: (actions: ToastManagerActions) => void
}

export interface ToastManagerActions {
  notify: (props: ToastProps) => string
}

export interface ToastProps extends SystemComponent {
  /**
   * Message displayed to the end user.
   */
  message: string
  /**
   * How long the toast should be apparent.
   */
  duration?: number
  /**
   * The position which the toast should be rendered at.
   */
  position?: ToastPosition
  /**
   * The toast's type.
   */
  type?: ToastType
  dismissible?: boolean
  action?: () => void
  /**
   * Toast icon's props. Touchpoint to customize
   * the toats' icon.
   */
  iconProps?: ToastIconProps
}

/**
 * Type of the toast to be rendered
 */
export type ToastType = 'success' | 'warning' | 'error' | 'info'

export interface ToastIconProps extends IconProps {
  type?: ToastType
}

type ToastPosition = 'bottom'

export interface ToasterProps {
  subframe?: boolean
}
