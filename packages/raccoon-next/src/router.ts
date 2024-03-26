import { publishMessage } from './message'

/**
 * This hook exposes the `navigation` method responsible
 * for enabling navigation between Next.js and Render pages.
 *
 * It triggers the triggerNextJSNavigation method from admin-shell.
 *
 * Read more about Raccoon's navigation architecture under the
 * navigation section of its docs.
 */
export function useNavigation() {
  /**
   * The `navigate` method is responsible for enabling navigation between Next.js and Render pages.
   */
  const navigate = (path: string, options?: NavigateOptions) => {
    if (!path.startsWith('/')) {
      console.warn('The path must start with /')

      return
    }

    const { type = 'navigation' } = options ?? {}

    publishMessage({
      type,
      data: {
        path,
      },
    })
  }

  return {
    navigate,
  }
}

interface NavigateOptions {
  /**
   * Use the default `navigation` option when navigating to a page within your Next.js app.
   * Under the hood, this `navigation` type delegates the navigation to the Next.js router.
   *
   * Use the `adminRelativeNavigation` option when navigating to a Render app page or a Next.js page
   * outside your Next.js app.
   * Under the hood, the `adminRelativeNavigation` type delegates the navigation entirely to Render.
   */
  type: 'navigation' | 'adminRelativeNavigation'
}
