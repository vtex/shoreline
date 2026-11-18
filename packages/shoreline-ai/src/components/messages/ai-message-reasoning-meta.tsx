import { forwardRef, useLocale } from '@vtex/shoreline'
import type { ComponentPropsWithoutRef } from 'react'

import { AIDotsLoader } from './ai-dots-loader'
import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import { formatReasoningDuration } from './format-duration'
import { useMessageMessagesContext } from './message-messages-context'

/**
 * Status beside the reasoning trigger: dots while running, "Worked for {duration}" when complete.
 * Internal building block; not part of the public API.
 *
 * @status experimental
 */
export const AIMessageReasoningMeta = forwardRef<
  HTMLSpanElement,
  Omit<ComponentPropsWithoutRef<'span'>, 'children'>
>(function AIMessageReasoningMeta(props, ref) {
  const { status, duration } = useAIMessageReasoningRootContext()
  const getMessage = useMessageMessagesContext()
  const locale = useLocale()

  const formatted =
    status === 'complete' ? formatReasoningDuration(duration, locale) : null

  return (
    <span ref={ref} data-sl-ai-message-reasoning-meta {...props}>
      {status === 'running' ? <AIDotsLoader /> : null}
      {formatted ? getMessage('workedFor', { duration: formatted }) : null}
    </span>
  )
})
