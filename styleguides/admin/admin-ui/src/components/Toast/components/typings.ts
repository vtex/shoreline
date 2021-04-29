import { ButtonProps } from 'reakit/ts'
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
   * Removes specific toast from the stack.
   */
  remove: (id: string) => void
  /**
   * The ID of each toast on the stack.
   */
  stack: string[]
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
   * How long the toast should be apparent, in milliseconds.
   * @default 10000
   */
  duration?: number
  /**
   * The position which the toast should be rendered at.
   * @default "bottom"
   */
  position?: ToastPosition
  /**
   * The toast's type.
   * @default "info"
   */
  type?: ToastType
  /**
   * Whether the toast can be dismissed or not.
   * @default false
   */
  dismissible?: boolean
  /**
   * Toast's actions' props.
   */
  action?: ButtonProps
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
  /**
   * Whether the toaster should render its portal
   * on the topmost window or not. Set this to
   * true in case you're on an iframe scenario and
   * you want to host your toaster on the topmost
   * window.
   * @default false
   * @unstable use at your own risk
   */
  subframe?: boolean
}
