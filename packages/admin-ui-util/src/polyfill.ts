/**
 * queueMicrotask polyfill
 */
export function queueMicrotask(cb: VoidFunction) {
  if (window.queueMicrotask && typeof window.queueMicrotask === 'function') {
    return window.queueMicrotask(cb)
  }

  Promise.resolve()
    .then(cb)
    .catch((e) =>
      setTimeout(() => {
        throw e
      })
    )
}
