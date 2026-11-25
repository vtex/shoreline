import { forwardRef, useSafeLayoutEffect } from '@vtex/shoreline'

import { AIThinkingIndicator } from './ai-thinking-indicator'
import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import { useIsPendingReasoning } from './reasoning-group-context'
import type { AIMessageReasoningLabelProps } from './types'
import { useReasoningStatusText } from './use-reasoning-status-text'

/**
 * Status text of the reasoning panel. It shimmers while running, carries the
 * duration when complete, and names the trigger. Before the message has any
 * part it is the live region (`role="status"`) of the pending header.
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
  const { state, actions, meta } = useAIMessageReasoningRootContext()
  const statusText = useReasoningStatusText()
  const pending = useIsPendingReasoning()

  // Tells the trigger and the content that this label names the panel.
  useSafeLayoutEffect(() => actions.registerLabel(), [actions.registerLabel])

  const running = state.status === 'running'
  const text = children ?? statusText

  return (
    <span
      ref={ref}
      id={meta.labelId}
      data-sl-ai-message-reasoning-label
      role={pending ? 'status' : undefined}
      {...spanProps}
    >
      {running ? <AIThinkingIndicator>{text}</AIThinkingIndicator> : text}
    </span>
  )
})
