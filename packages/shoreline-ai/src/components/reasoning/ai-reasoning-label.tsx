import { forwardRef, useSafeLayoutEffect } from '@vtex/shoreline'

import { AIThinkingIndicator } from '../messages/ai-thinking-indicator'
import { useAIReasoningRootContext } from './ai-reasoning-root'
import { useIsPendingReasoning } from './reasoning-group-context'
import type { AIReasoningLabelProps } from './types'
import { useReasoningStatusText } from './use-reasoning-status-text'

/**
 * Status text of the reasoning panel. It shimmers while running, carries the
 * duration when complete, and names the trigger. Before the message has any
 * part it is the live region (`role="status"`) of the pending header.
 *
 * @example
 * <AIReasoningHeader>
 *   <AIReasoningLabel>Analyzing orders…</AIReasoningLabel>
 *   <AIReasoningTrigger />
 * </AIReasoningHeader>
 *
 * @status experimental
 */
export const AIReasoningLabel = forwardRef<
  HTMLSpanElement,
  AIReasoningLabelProps
>(function AIReasoningLabel(props, ref) {
  const { children, ...spanProps } = props
  const { state, actions, meta } = useAIReasoningRootContext()
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
      data-sl-ai-reasoning-label
      role={pending ? 'status' : undefined}
      {...spanProps}
    >
      {running ? <AIThinkingIndicator>{text}</AIThinkingIndicator> : text}
    </span>
  )
})
