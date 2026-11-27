import { forwardRef, useLocale } from '@vtex/shoreline'
import { useEffect, useState } from 'react'

import { useAIReasoningRootContext } from './ai-reasoning-root'
import { formatElapsed } from './format-duration'
import type { AIReasoningElapsedProps } from './types'
import { useOptionalMessageMessages } from '../messages/message-messages-context'

const TICK = 1000

/**
 * Time since the reasoning started, refreshed every second. Renders only
 * while the reasoning is running.
 *
 * @example
 * <AIReasoningHeader>
 *   <AIReasoningLabel />
 *   <AIReasoningElapsed />
 * </AIReasoningHeader>
 *
 * @status experimental
 */
export const AIReasoningElapsed = forwardRef<
  HTMLSpanElement,
  AIReasoningElapsedProps
>(function AIReasoningElapsed(props, ref) {
  const { state } = useAIReasoningRootContext()
  const locale = useLocale()
  const getMessage = useOptionalMessageMessages()
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
    <span ref={ref} data-sl-ai-reasoning-elapsed {...props}>
      {formatElapsed(Math.max(0, now - state.startedAt), locale, getMessage)}
    </span>
  )
})
