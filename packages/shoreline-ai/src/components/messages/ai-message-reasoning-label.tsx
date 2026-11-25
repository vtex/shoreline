import { forwardRef, useLocale } from '@vtex/shoreline'

import { AIThinkingIndicator } from './ai-thinking-indicator'
import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import { formatReasoningDuration } from './format-duration'
import { useMessageMessagesContext } from './message-messages-context'
import type { AIMessageReasoningLabelProps } from './types'

/**
 * Status text of the reasoning panel. It shimmers while running, carries the
 * duration when complete, and names the trigger.
 *
 * @example
 * <AIMessageReasoningHeader>
 *   <AIMessageReasoningLabel>Analyzing orders…</AIMessageReasoningLabel>
 *   <AIMessageReasoningTrigger />
 * </AIMessageReasoningHeader>
 *
 * @status experimental
 */
export const AIMessageReasoningLabel = forwardRef<
  HTMLSpanElement,
  AIMessageReasoningLabelProps
>(function AIMessageReasoningLabel(props, ref) {
  const { children, ...spanProps } = props
  const { state, meta } = useAIMessageReasoningRootContext()
  const getMessage = useMessageMessagesContext()
  const locale = useLocale()

  const running = state.status === 'running'

  function defaultText() {
    if (running) return getMessage('reasoningStreaming')

    const duration = formatReasoningDuration(state.duration, locale)

    return duration
      ? getMessage('reasoningDoneIn', { duration })
      : getMessage('reasoningDone')
  }

  const text = children ?? defaultText()

  return (
    <span
      ref={ref}
      id={meta.labelId}
      data-sl-ai-message-reasoning-label
      {...spanProps}
    >
      {running ? <AIThinkingIndicator>{text}</AIThinkingIndicator> : text}
    </span>
  )
})
