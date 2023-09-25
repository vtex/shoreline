function prepare() {
  const adminShell = window.top

  if (!adminShell) {
    console.error(
      'No reference to the topmost window. Navigation will not work.'
    )
    return
  }

  // Since it's an IO app, we assume that the Admin is running on the same origin.
  const target = window.location.origin

  return { adminShell, target }
}

function navigate(pathname) {
  const { adminShell, target } = prepare()

  try {
    adminShell.postMessage(
      {
        type: 'render-to-nextjs-navigation',
        pathname: pathname,
      },
      target
    )
  } catch (error) {
    console.error(error)
  }
}

export function useNavigation() {
  return { navigate }
}
