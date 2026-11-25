import { forwardRef, useLocale } from '@vtex/shoreline'
import { useEffect, useState } from 'react'

import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import { formatElapsed } from './format-duration'
import type { AIMessageReasoningElapsedProps } from './types'

const TICK = 1000

/**
 * Time since the reasoning started, refreshed every second. Renders only
 * while the reasoning is running.
 *
 * @example
 * <AIMessageReasoningHeader>
 *   <AIMessageReasoningLabel />
 *   <AIMessageReasoningElapsed />
 * </AIMessageReasoningHeader>
 *
 * @status experimental
 */
export const AIMessageReasoningElapsed = forwardRef<
  HTMLSpanElement,
  AIMessageReasoningElapsedProps
>(function AIMessageReasoningElapsed(props, ref) {
  const { state } = useAIMessageReasoningRootContext()
  const locale = useLocale()
  const running = state.status === 'running'
  // The tick lives here, so only this part re-renders every second.
  const [now, setNow] = useState(Date.now)

  useEffect(() => {
    if (!running) return

    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), TICK)

    return () => clearInterval(timer)
  }, [running])

  if (!running || state.startedAt === undefined) return null

  return (
    <span ref={ref} data-sl-ai-message-reasoning-elapsed {...props}>
      {formatElapsed(Math.max(0, now - state.startedAt), locale)}
    </span>
  )
})
