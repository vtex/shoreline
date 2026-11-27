import { forwardRef } from '@vtex/shoreline'
import invariant from 'tiny-invariant'

import { AIReasoningContent } from './ai-reasoning-content'
import { AIReasoningHeader } from './ai-reasoning-header'
import { AIReasoningRoot, useAIReasoningRootContext } from './ai-reasoning-root'
import { useReasoningGroup } from './reasoning-group-context'
import type { AIReasoningProps, AIReasoningStatus } from './types'

/**
 * Reasoning template for `AIMessageParts`. `AIMessageParts` renders it once
 * per reasoning group, and once before the first part arrives, with the
 * group's status, duration and parts. Pass children to compose the panel
 * from the reasoning parts.
 *
 * @example
 * <AIMessageParts
 *   reasoning={
 *     <AIReasoning defaultExpanded>
 *       <AIReasoningHeader>
 *         <AIReasoningMark />
 *         <AIReasoningLabel>Analyzing orders…</AIReasoningLabel>
 *         <AIReasoningTrigger />
 *       </AIReasoningHeader>
 *       <AIReasoningContent />
 *     </AIReasoning>
 *   }
 * />
 *
 * @status experimental
 */
export const AIReasoning = forwardRef<HTMLDivElement, AIReasoningProps>(
  function AIReasoning(props, ref) {
    const { children, ...rootProps } = props
    const group = useReasoningGroup()

    invariant(
      group,
      'AIReasoning must be used within AIMessageParts (pass it as the `reasoning` prop)'
    )

    return (
      <AIReasoningRoot
        ref={ref}
        status={group.status}
        duration={group.duration}
        startedAt={group.startedAt}
        // The group that took over from the pending header: its mark skips the
        // enter animation, so the hand-off does not blink.
        data-continued={group.continued ? '' : undefined}
        {...rootProps}
      >
        {children ?? (
          <>
            <AIReasoningHeader />
            <AIReasoningContent />
          </>
        )}
      </AIReasoningRoot>
    )
  }
)

/**
 * Read-only state of the closest reasoning panel, for app parts placed inside
 * the reasoning template.
 *
 * @example
 * function Hint() {
 *   const { status } = useAIReasoning()
 *   return status === 'running' ? <span>Hold on</span> : null
 * }
 *
 * @status experimental
 */
export function useAIReasoning(): {
  status: AIReasoningStatus
  expanded: boolean
  duration?: number
} {
  const { state } = useAIReasoningRootContext()

  return {
    status: state.status,
    expanded: state.expanded,
    duration: state.duration,
  }
}
