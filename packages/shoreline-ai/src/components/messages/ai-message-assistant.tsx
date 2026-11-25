import { forwardRef } from '@vtex/shoreline'

import { AIMessageActions } from './ai-message-actions'
import { AIMessageParts } from './ai-message-parts'
import { AIMessageRoot } from './ai-message-root'
import type { AIMessageAssistantProps } from './types'

/**
 * Assistant message shell. Without children it renders the message parts and
 * the actions bar; with children it renders exactly the children.
 *
 * @status experimental
 * @example
 * <AIMessageAssistant />
 */
export const AIMessageAssistant = forwardRef<
  HTMLDivElement,
  AIMessageAssistantProps
>(function AIMessageAssistant(props, ref) {
  const { showReasoningTools = true, children, ...rootProps } = props

  return (
    <AIMessageRoot ref={ref} messageRole="assistant" {...rootProps}>
      {children ?? (
        <>
          <AIMessageParts showReasoningTools={showReasoningTools} />
          <AIMessageActions />
        </>
      )}
    </AIMessageRoot>
  )
})
