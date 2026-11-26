import { forwardRef } from '@vtex/shoreline'

import { AIWorkingMark } from '../messages/ai-working-mark'
import { useAIReasoningRootContext } from './ai-reasoning-root'
import type { AIReasoningMarkProps } from './types'
import { useWorkingMark } from '../messages/working-mark-context'

/**
 * Animated mark before the reasoning label. Renders only while the reasoning
 * is running. Its glyph is, in order: its children, `workingMark` of
 * `AIMessages`, then the default My Assistant mark.
 *
 * @example
 * <AIReasoningHeader>
 *   <AIReasoningMark />
 *   <AIReasoningLabel />
 * </AIReasoningHeader>
 *
 * @status experimental
 */
export const AIReasoningMark = forwardRef<
  HTMLSpanElement,
  AIReasoningMarkProps
>(function AIReasoningMark(props, ref) {
  const { children, ...spanProps } = props
  const { state } = useAIReasoningRootContext()
  const providedGlyph = useWorkingMark()

  if (state.status !== 'running') return null

  return (
    <AIWorkingMark ref={ref} data-sl-ai-reasoning-mark {...spanProps}>
      {children ?? providedGlyph}
    </AIWorkingMark>
  )
})
