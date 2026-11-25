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
