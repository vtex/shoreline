import { toaster } from '../components/Toaster'

function createToast() {
  const toast = Object.assign({}, toaster)

  return toast
}

/**
 * This function returns a toaster instance,
 * which has a `notify` method you can use
 * to make some toasts.
 *
 * @example
 * ```jsx
 * const toast = useToast()
 *
 * <Button
 *   onClick={() =>
 *     toast.notify({
 *       type: 'success',
 *       message: 'Succes!',
 *     })
 *   }
 * >
 *  Isn't this toast component cool?
 * </Button>
 * ```
 */
export function useToast() {
  return createToast()
}
