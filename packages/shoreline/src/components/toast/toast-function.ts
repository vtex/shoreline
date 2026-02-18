import { toast as toastFactory } from 'react-hot-toast/headless'
import type { ToastVariant } from './toast-types'

/**
 * Toast dispatcher function
 * @example
 * toast.informational('Message!')
 */
export const toast = {
  /** Dispatches an informational toast */
  informational(message: ToastMessage) {
    return toastFactory(message, getOptions('informational'))
  },
  /** Dispatches a success toast */
  success(message: ToastMessage) {
    return toastFactory.success(message, getOptions('success'))
  },
  /** Dispatches a critical toast */
  critical(message: ToastMessage) {
    return toastFactory.error(message, getOptions('critical'))
  },
  /** Dispatches a warning toast */
  warning(message: ToastMessage) {
    return toastFactory(message, getOptions('warning'))
  },
  /** Dispatches a loading toast with a spinner */
  loading(message: ToastMessage) {
    return toastFactory.loading(message, getOptions('informational'))
  },
  /** Tracks a promise and dispatches loading, success, or error toasts accordingly */
  promise(promise: Promise<any>, messages: ToastPromiseMessages) {
    return toastFactory.promise(promise, messages)
  },
  /** Dismisses a toast by id, or all toasts if no id is provided */
  dismiss: toastFactory.dismiss,
}

function getOptions(variant: ToastVariant): any {
  return {
    variant,
  }
}

type ToastMessage = JSX.Element | string

interface ToastPromiseMessages {
  success: ToastMessage
  loading: ToastMessage
  error: ToastMessage
}
