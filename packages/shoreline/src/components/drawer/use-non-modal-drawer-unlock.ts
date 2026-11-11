import { useEffect } from 'react'

/**
 * TODO: remove when Vaul Drawer.Root forwards `modal`
 * https://github.com/emilkowalski/vaul/pull/580
 * https://github.com/radix-ui/primitives/issues/3141
 *
 * While the drawer is open, this observer reverts any `body { pointer-events: none }`
 * within a microtask — including one set by a nested Radix overlay. Shoreline's own
 * Modal/ConfirmationModal use Ariakit and do not write body pointer-events.
 */
export function useNonModalDrawerUnlock(open: boolean | undefined) {
  useEffect(() => {
    if (!open) return

    const body = document.body
    let didUnlock = false

    const unlock = () => {
      if (body.style.pointerEvents !== 'none') return
      body.style.pointerEvents = 'auto'
      didUnlock = true
    }

    unlock()
    const raf = requestAnimationFrame(unlock)

    const observer = new MutationObserver(unlock)
    observer.observe(body, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      if (didUnlock && body.style.pointerEvents === 'auto') {
        body.style.pointerEvents = ''
      }
    }
  }, [open])
}
