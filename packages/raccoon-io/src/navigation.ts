/**
 * Prepares the navigate function by getting a reference to the Admin Shell
 * and the target origin.
 */
export function prepare() {
  const adminShell = window.top

  if (!adminShell) {
    console.error(
      'No reference to the topmost window. Navigation will not work.'
    )

    return { adminShell: null, target: null }
  }

  // Since it's an IO app, we assume that the Admin is running on the same origin.
  const target = window.location.origin

  return { adminShell, target }
}

/**
 * Navigates to the given pathname, acessing VTEX's Admin Shell.
 * This function should be used to navigate between pages from a VTEX IO React app
 * to a NextJS app (a.k.a Raccoon) or to another VTEX IO React app.
 *
 * @example
 * navigate('/admin/rocket/nextjs-internal-route')
 */
export function navigate(pathname: string) {
  const { adminShell, target } = prepare()

  if (!adminShell || !target) {
    return
  }

  if (!pathname.startsWith('/')) {
    console.warn('pathname should start with "/"')

    return
  }

  try {
    adminShell.postMessage(
      {
        type: 'top-level-navigation',
        pathname,
      },
      target
    )
  } catch (error) {
    console.error(error)
  }
}

/**
 * Returns a hook with the navigate function.
 *
 * This function should be used to navigate between pages from a VTEX IO React app
 * to a NextJS app (a.k.a Raccoon) or to another VTEX IO React app.
 *
 * @example
 * const { navigate } = useNavigation()
 */
export function useNavigation() {
  return { navigate }
}
