import { forwardRef } from '@vtex/shoreline'

import { AIMessageReasoningElapsed } from './ai-message-reasoning-elapsed'
import { AIMessageReasoningLabel } from './ai-message-reasoning-label'
import { AIMessageReasoningMark } from './ai-message-reasoning-mark'
import { AIMessageReasoningTrigger } from './ai-message-reasoning-trigger'
import type { AIMessageReasoningHeaderProps } from './types'

/**
 * Row above the reasoning content: mark, label, elapsed time and the chevron
 * button. Pass children to compose your own row from the same parts. Before
 * the message has any part, its label is a live region (`role="status"`);
 * the elapsed time stays outside it, so it is not announced every second.
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
  return (
    <div ref={ref} data-sl-ai-message-reasoning-header {...divProps}>
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
