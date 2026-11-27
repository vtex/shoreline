import { forwardRef } from '@vtex/shoreline'

import { AIReasoningElapsed } from './ai-reasoning-elapsed'
import { AIReasoningLabel } from './ai-reasoning-label'
import { AIReasoningMark } from './ai-reasoning-mark'
import { AIReasoningTrigger } from './ai-reasoning-trigger'
import type { AIReasoningHeaderProps } from './types'

/**
 * Row above the reasoning content: mark, label, elapsed time and the chevron
 * button. Pass children to compose your own row from the same parts. Before
 * the message has any part, its label is a live region (`role="status"`);
 * the elapsed time stays outside it, so it is not announced every second.
 *
 * @example
 * <AIReasoningRoot status="running">
 *   <AIReasoningHeader />
 *   <AIReasoningContent>
 *     <AIReasoningText />
 *   </AIReasoningContent>
 * </AIReasoningRoot>
 *
 * @status experimental
 */
export const AIReasoningHeader = forwardRef<
  HTMLDivElement,
  AIReasoningHeaderProps
>(function AIReasoningHeader(props, ref) {
  const { children, ...divProps } = props
  return (
    <div ref={ref} data-sl-ai-reasoning-header {...divProps}>
      {children ?? (
        <>
          <AIReasoningMark />
          <AIReasoningLabel />
          <AIReasoningElapsed />
          <AIReasoningTrigger />
        </>
      )}
    </div>
  )
})
