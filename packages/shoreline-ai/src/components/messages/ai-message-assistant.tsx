import { useAuiState } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { AIMessageActions } from './ai-message-actions'
import { AIMessageParts } from './ai-message-parts'
import { AIMessageRoot } from './ai-message-root'
import type { AIMessageAssistantProps } from './types'

/**
 * Assistant message shell with default part rendering.
 *
 * @status experimental
 */
export const AIMessageAssistant = forwardRef<
  HTMLDivElement,
  AIMessageAssistantProps
>(function AIMessageAssistant(props, ref) {
  const { showReasoningTools = true, children, ...rootProps } = props

  const showActions = useAuiState((state) => {
    const status = state.message.status
    const complete = status
      ? status.type === 'complete'
      : !(state.message.isLast && state.thread.isRunning)

    if (!complete) return false

    return state.message.content.some(
      (part) => part.type === 'text' && part.text.length > 0
    )
  })

  return (
    <AIMessageRoot ref={ref} messageRole="assistant" {...rootProps}>
      {children ?? <AIMessageParts showReasoningTools={showReasoningTools} />}
      {showActions ? <AIMessageActions /> : null}
    </AIMessageRoot>
  )
})
