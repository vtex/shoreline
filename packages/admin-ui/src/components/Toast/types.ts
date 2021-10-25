import type { ReactNode } from 'react'

export interface ToastAction {
  /**
   * Action Button Label
   */
  label: string
  /**
   * Action Button on click event
   */
  onClick: () => void
}

export interface InternalToast extends Toast {
  /**
   * Toast's Id
   */
  id: string
  /**
   * Key to avoid Toast's duplication on the queue.
   */
  dedupeKey: string
  /**
   * Whether the Toast should be removed from the queue or not.
   */
  shouldRemove: boolean
}

export interface Toast {
  /**
   * Toast's key
   */
  key?: string
  /**
   * Message displayed to the end-user.
   */
  message: ReactNode
  /**
   * The toast's tone.
   * @default info
   */
  tone?: 'critical' | 'info' | 'positive' | 'warning'
  /**
   * Whether the toast can be dismissed or not.
   * @default false
   */
  dismissible?: boolean
  /**
   * Toast's Action Button props.
   */
  action?: ToastAction
  /**
   * How long the toast should be apparent, in milliseconds.
   * @default 10000
   */
  duration?: number
}
