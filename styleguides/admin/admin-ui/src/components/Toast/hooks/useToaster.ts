import { Toaster } from '../components/Toaster'
import { ToasterProps } from '../components/typings'

let toasterInstance: Toaster | null = null
let iframeToasterInstance: Toaster | null = null

/**
 * Abstracts the existing toaster instance, making it possible
 * to reuse the instance and therefore persist the toast
 * stack regardless of what's the component calling `useToaster`.
 */
function createToaster(props?: ToasterProps) {
  const isSubframe = !!props?.subframe

  if (isSubframe) {
    if (iframeToasterInstance) {
      return iframeToasterInstance
    }

    iframeToasterInstance = new Toaster({ subframe: true })
    return iframeToasterInstance
  }

  if (toasterInstance) {
    return toasterInstance
  }

  toasterInstance = new Toaster({ subframe: false })

  return toasterInstance
}

/**
 * This function returns a toaster instance,
 * which has a `toast` method you can use
 * to make some toasts.
 *
 * Destructuring the toaster will make
 * the toast method unavailable,
 * once the toast method binding
 * is asynchronous, and destructuring
 * will dereference the unbound method.
 *
 * @example
 * ```jsx
 * // correct usage ✅
 * const toaster = useToaster()
 * // incorrect usage 🚫
 * const { toast } = useToaster()
 *
 * <Button
 *   onClick={() =>
 *     toaster.toast({
 *       type: 'success',
 *       message: 'Succes!',
 *     })
 *   }
 * >
 *  Isn't this toast component cool?
 * </Button>
 * ```
 */
export function useToaster(props?: ToasterProps) {
  return createToaster(props)
}
