import { toast as toastFactory } from 'react-hot-toast/headless'

type Message = JSX.Element | string
interface ResolveMessages {
  success: Message
  loading: Message
  error: Message
}

export const toast = {
  informational(message: Message) {
    return toastFactory(message, {
      variant: 'informational',
    } as any)
  },
  success(message: Message) {
    return toastFactory.success(message, {
      variant: 'success',
    } as any)
  },
  critical(message: Message) {
    return toastFactory.error(message, {
      variant: 'critical',
    } as any)
  },
  warning(message: Message) {
    return toastFactory(message, {
      variant: 'warning',
    } as any)
  },
  loading(message: Message) {
    return toastFactory.loading(message, {
      variant: 'informational',
    } as any)
  },
  promise(promise: Promise<any>, messages: ResolveMessages) {
    return toastFactory.promise(promise, messages)
  },
}
