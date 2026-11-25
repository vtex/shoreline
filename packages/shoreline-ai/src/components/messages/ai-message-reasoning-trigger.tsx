import { forwardRef } from '@vtex/shoreline'
import type { MouseEvent } from 'react'

import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import { IconExpandLess, IconExpandMore } from './icons'
import { useIsPendingReasoning } from './reasoning-group-context'
import type { AIMessageReasoningTriggerProps } from './types'
import { useReasoningStatusText } from './use-reasoning-status-text'

/**
 * Chevron button that opens and closes the reasoning content. It is the only
 * toggle in the header; its accessible name comes from the label, or from the
 * status text when the header has no label. Renders nothing before the
 * message has any part, as there is nothing to open yet.
 *
 * @example
 * <AIMessageReasoningHeader>
 *   <AIMessageReasoningLabel />
 *   <AIMessageReasoningTrigger />
 * </AIMessageReasoningHeader>
 *
 * @status experimental
 */
export const AIMessageReasoningTrigger = forwardRef<
  HTMLButtonElement,
  AIMessageReasoningTriggerProps
>(function AIMessageReasoningTrigger(props, ref) {
  const { onClick, ...buttonProps } = props
  const { state, actions, meta } = useAIMessageReasoningRootContext()
  const statusText = useReasoningStatusText()
  const pending = useIsPendingReasoning()

  if (pending) return null

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return
    actions.setExpanded(!state.expanded)
  }

  return (
    <button
      ref={ref}
      type="button"
      data-sl-ai-message-reasoning-trigger
      aria-expanded={state.expanded}
      aria-controls={meta.contentId}
      aria-labelledby={state.hasLabel ? meta.labelId : undefined}
      aria-label={state.hasLabel ? undefined : statusText}
      onClick={handleClick}
      {...buttonProps}
    >
      {state.expanded ? <IconExpandLess /> : <IconExpandMore />}
    </button>
  )
})
