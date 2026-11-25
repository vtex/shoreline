import { useSyncExternalStore } from 'react'

const TICK = 60_000

const listeners = new Set<() => void>()
let timer: ReturnType<typeof setInterval> | undefined
let snapshot = Date.now()

function subscribe(listener: () => void) {
  listeners.add(listener)

  if (listeners.size === 1) {
    snapshot = Date.now()
    timer = setInterval(() => {
      snapshot = Date.now()
      for (const notify of listeners) notify()
    }, TICK)
  }

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0 && timer !== undefined) {
      clearInterval(timer)
      timer = undefined
    }
  }
}

const getSnapshot = () => snapshot
// No clock on the server and in the hydration pass: the server's time and
// timezone would not match the client's.
const getServerSnapshot = () => null

/**
 * Current time in epoch ms, shared by every caller and refreshed once per
 * minute. A single interval runs while at least one consumer is mounted.
 * `null` on the server and during hydration; render time-dependent output
 * only once it is a number.
 */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
