import { forwardRef } from '@vtex/shoreline'
import invariant from 'tiny-invariant'

import { AIMessageReasoningContent } from './ai-message-reasoning-content'
import { AIMessageReasoningHeader } from './ai-message-reasoning-header'
import {
  AIMessageReasoningRoot,
  useAIMessageReasoningRootContext,
} from './ai-message-reasoning-root'
import { useReasoningGroup } from './reasoning-group-context'
import type { AIMessageReasoningProps, AIMessageReasoningStatus } from './types'

/**
 * Reasoning template for `AIMessageParts`. `AIMessageParts` renders it once
 * per reasoning group, and once before the first part arrives, with the
 * group's status, duration and parts. Pass children to compose the panel
 * from the reasoning parts.
 *
 * @example
 * <AIMessageParts
 *   reasoning={
 *     <AIMessageReasoning defaultExpanded>
 *       <AIMessageReasoningHeader>
 *         <AIMessageReasoningMark />
 *         <AIMessageReasoningLabel>Analyzing orders…</AIMessageReasoningLabel>
 *         <AIMessageReasoningTrigger />
 *       </AIMessageReasoningHeader>
 *       <AIMessageReasoningContent />
 *     </AIMessageReasoning>
 *   }
 * />
 *
 * @status experimental
 */
export const AIMessageReasoning = forwardRef<
  HTMLDivElement,
  AIMessageReasoningProps
>(function AIMessageReasoning(props, ref) {
  const { children, ...rootProps } = props
  const group = useReasoningGroup()

  invariant(
    group,
    'AIMessageReasoning must be used within AIMessageParts (pass it as the `reasoning` prop)'
  )

  return (
    <AIMessageReasoningRoot
      ref={ref}
      status={group.status}
      duration={group.duration}
      startedAt={group.startedAt}
      {...rootProps}
    >
      {children ?? (
        <>
          <AIMessageReasoningHeader />
          <AIMessageReasoningContent />
        </>
      )}
    </AIMessageReasoningRoot>
  )
})

/**
 * Read-only state of the closest reasoning panel, for app parts placed inside
 * the reasoning template.
 *
 * @example
 * function Hint() {
 *   const { status } = useAIMessageReasoning()
 *   return status === 'running' ? <span>Hold on</span> : null
 * }
 *
 * @status experimental
 */
export function useAIMessageReasoning(): {
  status: AIMessageReasoningStatus
  expanded: boolean
  duration?: number
} {
  const { state } = useAIMessageReasoningRootContext()

  return {
    status: state.status,
    expanded: state.expanded,
    duration: state.duration,
  }
}
