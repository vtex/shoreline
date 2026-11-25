import { forwardRef } from '@vtex/shoreline'
import type { MouseEvent } from 'react'

import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import { IconExpandLess, IconExpandMore } from './icons'
import type { AIMessageReasoningTriggerProps } from './types'

/**
 * Chevron button that opens and closes the reasoning content. It is the only
 * toggle in the header; its accessible name comes from the label.
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
      aria-labelledby={meta.labelId}
      onClick={handleClick}
      {...buttonProps}
    >
      {state.expanded ? <IconExpandLess /> : <IconExpandMore />}
    </button>
  )
})
