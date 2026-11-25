import { forwardRef } from '@vtex/shoreline'

import { AIMessageReasoningElapsed } from './ai-message-reasoning-elapsed'
import { AIMessageReasoningLabel } from './ai-message-reasoning-label'
import { AIMessageReasoningMark } from './ai-message-reasoning-mark'
import { AIMessageReasoningTrigger } from './ai-message-reasoning-trigger'
import { useIsPendingReasoning } from './reasoning-group-context'
import type { AIMessageReasoningHeaderProps } from './types'

/**
 * Row above the reasoning content: mark, label, elapsed time and the chevron
 * button. Pass children to compose your own row from the same parts. Before
 * the message has any part it is a live region (`role="status"`).
 *
 * @example
 * <AIMessageReasoningRoot status="running">
 *   <AIMessageReasoningHeader />
 *   <AIMessageReasoningContent>
 *     <AIMessageReasoningText />
 *   </AIMessageReasoningContent>
 * </AIMessageReasoningRoot>
 *
 * @status experimental
 */
export const AIMessageReasoningHeader = forwardRef<
  HTMLDivElement,
  AIMessageReasoningHeaderProps
>(function AIMessageReasoningHeader(props, ref) {
  const { children, ...divProps } = props
  const pending = useIsPendingReasoning()

  return (
    <div
      ref={ref}
      data-sl-ai-message-reasoning-header
      role={pending ? 'status' : undefined}
      {...divProps}
    >
      {children ?? (
        <>
          <AIMessageReasoningMark />
          <AIMessageReasoningLabel />
          <AIMessageReasoningElapsed />
          <AIMessageReasoningTrigger />
        </>
      )}
    </div>
  )
})
