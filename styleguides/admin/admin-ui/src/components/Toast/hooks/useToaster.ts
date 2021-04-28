import { toaster, iframeToaster } from '../components/Toaster'
import { ToasterProps } from '../components/typings'

/**
 * Abstracts the existing toaster instance, making it possible
 * to reuse the instance and therefore persist the toast
 * stack regardless of what's the component calling `useToaster`.
 */
function createToaster(props?: ToasterProps) {
  const isSubframe = props?.subframe

  if (isSubframe) {
    const toasterInstance = Object.assign({}, iframeToaster)
    return toasterInstance
  }

  const toasterInstance = Object.assign({}, toaster)
  return toasterInstance
}

/**
 * This function returns a toaster instance,
 * which has a `notify` method you can use
 * to make some toasts.
 *
 * @example
 * ```jsx
 * const { toast } = useToaster()
 *
 * <Button
 *   onClick={() =>
 *     toast({
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
