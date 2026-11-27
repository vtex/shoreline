import { forwardRef } from '@vtex/shoreline'

import {
  useAIReasoningCollapseProps,
  useAIReasoningRootContext,
} from './ai-reasoning-root'
import { useReasoningGroup } from './reasoning-group-context'
import type { AIReasoningContentProps } from './types'

/**
 * Collapsible body of the reasoning panel. Inside the `reasoning` template of
 * `AIMessageParts` it renders the group's parts when it has no children, and
 * nothing before the message has any part.
 *
 * @example
 * <AIReasoningRoot status="complete" defaultExpanded>
 *   <AIReasoningHeader />
 *   <AIReasoningContent>
 *     <AIReasoningText />
 *   </AIReasoningContent>
 * </AIReasoningRoot>
 *
 * @status experimental
 */
export const AIReasoningContent = forwardRef<
  HTMLDivElement,
  AIReasoningContentProps
>(function AIReasoningContent(props, ref) {
  const { children, ...divProps } = props
  const { state, meta } = useAIReasoningRootContext()
  const getCollapseProps = useAIReasoningCollapseProps()
  const group = useReasoningGroup()
  const content = children ?? group?.parts

  // Pending header: there is nothing to show yet, not even the empty bar.
  if (group && group.parts === null && children === undefined) return null

  return (
    <div
      data-sl-ai-reasoning-content
      {...getCollapseProps({
        ref,
        id: meta.contentId,
        // A group named by the label; without a label, no role at all.
        role: state.hasLabel ? 'group' : undefined,
        'aria-labelledby': state.hasLabel ? meta.labelId : undefined,
      })}
      {...divProps}
    >
      {content}
    </div>
  )
})
