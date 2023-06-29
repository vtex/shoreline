export function isIframe() {
  // eslint-disable-next-line no-restricted-globals
  return window !== top
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}
