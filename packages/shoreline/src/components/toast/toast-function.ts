import { toast as toastFactory } from 'react-hot-toast/headless'
import type { ToastVariant } from './toast-types'

/**
 * Toast dispatcher function
 * @example
 * toast.informational('Message!')
 */
export const toast = {
  informational(message: ToastMessage) {
    return toastFactory(message, getOptions('informational'))
  },
  success(message: ToastMessage) {
    return toastFactory.success(message, getOptions('success'))
  },
  critical(message: ToastMessage) {
    return toastFactory.error(message, getOptions('critical'))
  },
  warning(message: ToastMessage) {
    return toastFactory(message, getOptions('warning'))
  },
  loading(message: ToastMessage) {
    return toastFactory.loading(message, getOptions('informational'))
  },
  promise(promise: Promise<any>, messages: ToastPromiseMessages) {
    return toastFactory.promise(promise, messages)
  },
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
