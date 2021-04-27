import { toaster, iframeToaster } from '../components/Toaster'
import { ToasterProps } from '../components/typings'

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
 * const toaster = useToaster()
 *
 * <Button
 *   onClick={() =>
 *     toaster.notify({
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
