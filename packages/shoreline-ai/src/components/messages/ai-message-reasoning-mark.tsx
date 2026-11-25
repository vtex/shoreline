import { forwardRef } from '@vtex/shoreline'

import { AIWorkingMark } from './ai-working-mark'
import { useAIMessageReasoningRootContext } from './ai-message-reasoning-root'
import type { AIMessageReasoningMarkProps } from './types'
import { useWorkingMark } from './working-mark-context'

/**
 * Animated mark before the reasoning label. Renders only while the reasoning
 * is running.
 *
 * @example
 * <AIMessageReasoningHeader>
 *   <AIMessageReasoningMark />
 *   <AIMessageReasoningLabel />
 * </AIMessageReasoningHeader>
 *
 * @status experimental
 */
export const AIMessageReasoningMark = forwardRef<
  HTMLSpanElement,
  AIMessageReasoningMarkProps
>(function AIMessageReasoningMark(props, ref) {
  const { children, ...spanProps } = props
  const { state } = useAIMessageReasoningRootContext()
  const providedGlyph = useWorkingMark()

  if (state.status !== 'running') return null

  return (
    <AIWorkingMark ref={ref} data-sl-ai-message-reasoning-mark {...spanProps}>
      {children ?? providedGlyph}
    </AIWorkingMark>
  )
})
