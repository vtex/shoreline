import { useAuiState } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { AIMessageParts } from './ai-message-parts'
import { AIMessageRoot } from './ai-message-root'
import { AIThinkingIndicator } from './ai-thinking-indicator'
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

  const showThinking = useAuiState((state) => {
    const status = state.message.status
    const running = status
      ? status.type === 'running'
      : state.message.isLast && state.thread.isRunning

    if (!running) return false

    return !state.message.content.some(
      (part) =>
        (part.type === 'text' && part.text.length > 0) ||
        part.type === 'reasoning' ||
        part.type === 'tool-call'
    )
  })

  return (
    <AIMessageRoot ref={ref} messageRole="assistant" {...rootProps}>
      {children ?? <AIMessageParts showReasoningTools={showReasoningTools} />}
      {showThinking ? <AIThinkingIndicator /> : null}
    </AIMessageRoot>
  )
})
