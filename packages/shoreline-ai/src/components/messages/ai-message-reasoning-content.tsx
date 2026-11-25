import { forwardRef } from '@vtex/shoreline'

import {
  useAIMessageReasoningCollapseProps,
  useAIMessageReasoningRootContext,
} from './ai-message-reasoning-root'
import { useReasoningGroup } from './reasoning-group-context'
import type { AIMessageReasoningContentProps } from './types'

/**
 * Collapsible body of the reasoning panel. Inside the `reasoning` template of
 * `AIMessageParts` it renders the group's parts when it has no children.
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
  const { state, meta } = useAIMessageReasoningRootContext()
  const getCollapseProps = useAIMessageReasoningCollapseProps()
  const group = useReasoningGroup()

  return (
    <div
      data-sl-ai-message-reasoning-content
      {...getCollapseProps({
        ref,
        id: meta.contentId,
        'aria-labelledby': state.hasLabel ? meta.labelId : undefined,
      })}
      {...divProps}
    >
      {children ?? group?.parts}
    </div>
  )
})
