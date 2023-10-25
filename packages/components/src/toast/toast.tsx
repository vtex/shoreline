import { toast as toastFactory } from 'react-hot-toast/headless'

export const toast = {
  informational(message: string) {
    return toastFactory(message, {
      context: 'informational',
    } as any)
  },
  success(message: string) {
    return toastFactory.success(message, {
      context: 'success',
    } as any)
  },
  critical(message: string) {
    return toastFactory.error(message, {
      context: 'critical',
    } as any)
  },
  warning(message: string) {
    return toastFactory(message, {
      context: 'warning',
    } as any)
  },
  loading(message: string) {
    return toastFactory.loading(message)
  },
  promise(promise: Promise<any>) {
    return toastFactory.promise(promise, {
      success: 'loaded',
      loading: 'loading',
      error: 'erorr',
    })
  },
}
