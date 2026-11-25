import { forwardRef } from '@vtex/shoreline'

import {
  useAIMessageReasoningCollapseProps,
  useAIMessageReasoningRootContext,
} from './ai-message-reasoning-root'
import type { AIMessageReasoningContentProps } from './types'

/**
 * Collapsible body of the reasoning panel.
 *
 * @example
 * <AIMessageReasoningRoot status="complete" defaultExpanded>
 *   <AIMessageReasoningHeader />
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
  const { meta } = useAIMessageReasoningRootContext()
  const getCollapseProps = useAIMessageReasoningCollapseProps()

  return (
    <div
      data-sl-ai-message-reasoning-content
      {...getCollapseProps({
        ref,
        id: meta.contentId,
        'aria-labelledby': meta.labelId,
      })}
      {...divProps}
    >
      {children}
    </div>
  )
})
