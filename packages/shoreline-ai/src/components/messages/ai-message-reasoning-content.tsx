import { forwardRef } from '@vtex/shoreline'

import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import type { AIMessageReasoningContentProps } from './types'

/**
 * Collapsible body of the reasoning panel.
 *
 * @example
 * <AIMessageReasoningRoot status="complete" defaultExpanded>
 *   <AIMessageReasoningTrigger />
 *   <AIMessageReasoningContent>
 *     <AIMessageReasoningText />
 *   </AIMessageReasoningContent>
 * </AIMessageReasoningRoot>
 *
 * @status experimental
 */
export const AIMessageReasoningContent = forwardRef<
  HTMLDivElement,
  AIMessageReasoningContentProps
>(function AIMessageReasoningContent(props, ref) {
  const { children, ...divProps } = props
  const { getCollapseProps } = useAIMessageReasoningRootContext()

  return (
    <div
      data-sl-ai-message-reasoning-content
      {...getCollapseProps({ ref })}
      {...divProps}
    >
      {children}
    </div>
  )
})
