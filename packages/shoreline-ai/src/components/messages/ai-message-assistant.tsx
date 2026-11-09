import { forwardRef } from '@vtex/shoreline'

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

  return (
    <AIMessageRoot ref={ref} messageRole="assistant" {...rootProps}>
      {children ?? <AIMessageParts showReasoningTools={showReasoningTools} />}
    </AIMessageRoot>
  )
})
