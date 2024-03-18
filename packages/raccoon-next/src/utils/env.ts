export const DEV_ACCOUNT = process.env.NEXT_PUBLIC_VTEX_ACCOUNT || ''
export const DEV_WORKSPACE = process.env.NEXT_PUBLIC_VTEX_WORKSPACE || ''
export const DEV_TOKEN = process.env.NEXT_PUBLIC_VTEX_TOKEN || ''

export function isIframe() {
  // eslint-disable-next-line no-restricted-globals
  return window !== top
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}

/**
 * This function checks whether the app has VTEX credentials loaded
 * in the environment variables or not while in development mode.
 *
 * See the `raccoon-dev` package for more information.
 */
export function hasVtexDevCredentials() {
  if (!isDev()) {
    return false
  }

  if (!DEV_ACCOUNT || !DEV_WORKSPACE || !DEV_TOKEN) {
    return false
  }

  return true
}
