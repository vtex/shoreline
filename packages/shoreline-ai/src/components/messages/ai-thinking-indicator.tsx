import { forwardRef } from '@vtex/shoreline'

import type { AIThinkingIndicatorProps } from './types'

/**
 * Text effect shown while the assistant has not produced any content yet.
 * Renders its children with a shimmer sweep; it carries no role and no default text.
 *
 * @status experimental
 * @example
 * <AIThinkingIndicator>Loading orders…</AIThinkingIndicator>
 */
export const AIThinkingIndicator = forwardRef<
  HTMLSpanElement,
  AIThinkingIndicatorProps
>(function AIThinkingIndicator(props, ref) {
  const { children, ...rest } = props

  return (
    <span ref={ref} data-sl-ai-thinking-indicator {...rest}>
      {children}
    </span>
  )
})
