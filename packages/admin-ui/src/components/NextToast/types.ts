import type { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

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
  description?: string
  dismissible?: boolean
  action?: ToastAction
  type?: 'error' | 'info' | 'success' | 'warning'
}
