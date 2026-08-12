import { useEffect } from 'react'

/**
 * TODO: remove when Vaul Drawer.Root forwards `modal`
 * https://github.com/emilkowalski/vaul/pull/580
 * https://github.com/radix-ui/primitives/issues/3141
 */
export function useNonModalDrawerUnlock(open: boolean | undefined) {
  useEffect(() => {
    if (!open) return

    const body = document.body

    const unlock = () => {
      if (body.style.pointerEvents === 'none') {
        body.style.pointerEvents = 'auto'
      }
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
      if (body.style.pointerEvents === 'auto') {
        body.style.pointerEvents = ''
      }
    }
  }, [open])
}
