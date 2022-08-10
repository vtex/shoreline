import type { HTMLAttributes, ReactNode } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'

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

export interface InternalToastProps extends ToastProps {
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

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Toast's key
   */
  key?: string
  /**
   * Message displayed to the end-user.
   */
  message: ReactNode
  /**
   * The toast's variant.
   * @default info
   */
  variant?: 'critical' | 'info' | 'positive' | 'warning'
  /**
   * Whether the toast can be dismissed or not.
   * @default true
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
  /**
   * `csx` properties
   * @default {}
   */
  csx?: StyleProp
}
