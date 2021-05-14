import { Toaster } from './components/Toaster'

let toaster: Toaster | null = null

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
  if (!toaster) {
    toaster = new Toaster({})
  }

  return toaster
})()
