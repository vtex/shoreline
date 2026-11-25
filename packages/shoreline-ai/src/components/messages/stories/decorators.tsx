import { useEffect, useState, type ReactNode } from 'react'
import { LocaleProvider } from '@vtex/shoreline'

import type { StreamTransport } from '../../../runtime/types'
import { MockRuntimeProvider } from '../../../test-utils'

export function MessagesStoryDecorator(props: {
  locale?: string
  /** Replaces the default mock transport (keep the reference stable). */
  transport?: StreamTransport
  children: ReactNode
}) {
  const { locale = 'en-US', transport, children } = props

  return (
    <LocaleProvider locale={locale}>
      <MockRuntimeProvider transport={transport}>
        <div
          style={{
            height: 'calc(100vh - 2rem)',
            minHeight: 480,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </MockRuntimeProvider>
    </LocaleProvider>
  )
}

/** Instant the show stories run at: 30 seconds after the seeded messages. */
export const FROZEN_NOW = Date.parse('2026-05-20T12:00:30.000Z')

let realNow: typeof Date.now | null = null

function freezeClock(now: number) {
  realNow ??= Date.now
  Date.now = () => now
}

function restoreClock() {
  if (realNow) {
    Date.now = realNow
    realNow = null
  }
}

/**
 * Freezes `Date.now` while mounted, so relative dates and the elapsed time of
 * a running reasoning render the same text on every Chromatic run. Timers
 * still fire, but they read the frozen clock and keep the text unchanged.
 */
export function FrozenClock(props: { now?: number; children: ReactNode }) {
  const { now = FROZEN_NOW, children } = props

  // Frozen during render: children read the clock when they first render.
  useState(() => freezeClock(now))
  useEffect(() => {
    freezeClock(now)

    return restoreClock
  }, [now])

  return <>{children}</>
}

type Restore = () => void

/**
 * Installs a fake clipboard and keeps the 2 second "copied" reset from ever
 * firing, so a story can leave the copied state on screen. Both are restored
 * when the story unmounts. The component is not changed: only `setTimeout`
 * calls of exactly 2000ms are swallowed.
 */
function installCopiedEnvironment(): Restore {
  const clipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
  const realSetTimeout = window.setTimeout

  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => {} },
  })

  window.setTimeout = ((handler: TimerHandler, delay?: number, ...args: []) =>
    delay === 2000
      ? 0
      : realSetTimeout(handler, delay, ...args)) as typeof window.setTimeout

  return () => {
    window.setTimeout = realSetTimeout

    if (clipboard) {
      Object.defineProperty(navigator, 'clipboard', clipboard)
    } else {
      Reflect.deleteProperty(navigator, 'clipboard')
    }
  }
}

let restoreCopied: Restore | null = null

function installOnce() {
  restoreCopied ??= installCopiedEnvironment()
}

/** Wraps a story whose play function copies and must keep the copied state. */
export function CopiedEnvironment(props: { children: ReactNode }) {
  // Installed during render so it is in place before the story mounts.
  useState(installOnce)
  useEffect(() => {
    installOnce()

    return () => {
      restoreCopied?.()
      restoreCopied = null
    }
  }, [])

  return <>{props.children}</>
}
