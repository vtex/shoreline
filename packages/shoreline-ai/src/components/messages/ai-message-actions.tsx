import { useAuiState } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { AIMessageCopy } from './ai-message-copy'
import { AIMessageDate } from './ai-message-date'
import type { AIMessageActionsProps } from './types'

/**
 * Bar under a completed assistant message that has text. Renders nothing for
 * any other message, including user messages. Its children replace the
 * default copy button and date.
 *
 * @status experimental
 * @example
 * <AIMessageActions>
 *   <AIMessageAction label="Good response"><IconThumbsUp /></AIMessageAction>
 *   <AIMessageCopy />
 *   <AIMessageDate />
 * </AIMessageActions>
 */
export const AIMessageActions = forwardRef<
  HTMLDivElement,
  AIMessageActionsProps
>(function AIMessageActions(props, ref) {
  const { children, ...rest } = props

  const show = useAuiState((state) => {
    if (state.message.role !== 'assistant') return false

    const status = state.message.status
    const complete = status
      ? status.type === 'complete'
      : !(state.message.isLast && state.thread.isRunning)

    if (!complete) return false

    return state.message.content.some(
      (part) => part.type === 'text' && part.text.length > 0
    )
  })

  if (!show) return null

  return (
    <div ref={ref} data-sl-ai-message-actions {...rest}>
      {children ?? (
        <>
          <AIMessageCopy />
          <AIMessageDate />
        </>
      )}
    </div>
  )
})
