import { forwardRef } from '@vtex/shoreline'
import type { MouseEvent } from 'react'

import { useAIReasoningRootContext } from './ai-reasoning-root'
import { IconExpandLess, IconExpandMore } from '../icons/icon-expand'
import { useIsPendingReasoning } from './reasoning-group-context'
import type { AIReasoningTriggerProps } from './types'
import { useReasoningStatusText } from './use-reasoning-status-text'

/**
 * Chevron button that opens and closes the reasoning content. It is the only
 * toggle in the header; its accessible name comes from the label, or from the
 * status text when the header has no label. Renders nothing before the
 * message has any part, as there is nothing to open yet.
 *
 * @example
 * <AIReasoningHeader>
 *   <AIReasoningLabel />
 *   <AIReasoningTrigger />
 * </AIReasoningHeader>
 *
 * @status experimental
 */
export const AIReasoningTrigger = forwardRef<
  HTMLButtonElement,
  AIReasoningTriggerProps
>(function AIReasoningTrigger(props, ref) {
  const { onClick, ...buttonProps } = props
  const { state, actions, meta } = useAIReasoningRootContext()
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
      data-sl-ai-reasoning-trigger
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
