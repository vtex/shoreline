import { ToastManager } from './components/ToastManager'

let toastManager: ToastManager | null = null

/**
 * The toast is a Toaster instance, which has
 * a dispatch method that will mount the Toast
 * on a portal and display the desired message.
 *
 * @example
 * ```jsx
 * <Button
 *   onClick={() =>
 *     toast.dispatch({
 *       type: 'success',
 *       message: 'Succes!',
 *     })
 *   }
 * >
 *  Isn't this toast component cool?
 * </Button>
 * ```
 */
export const toast = (() => {
  if (!toastManager) {
    toastManager = new ToastManager({})
  }

  return toastManager
})()
