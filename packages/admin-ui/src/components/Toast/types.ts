import type { ReactNode } from 'react'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface InternalToast extends Toast {
  id: string
  dedupeKey: string
  shouldRemove: boolean
}

export interface Toast {
  key?: string
  message: ReactNode
  type?: 'error' | 'info' | 'success' | 'warning'
  dismissible?: boolean
  action?: ToastAction
  duration?: number
}
