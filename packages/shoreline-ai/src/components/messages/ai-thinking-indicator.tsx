import { forwardRef } from '@vtex/shoreline'

import { AIDotsLoader } from './ai-dots-loader'
import { useMessageMessagesContext } from './message-messages-context'
import type { AIThinkingIndicatorProps } from './types'

/**
 * Status shown while the assistant has not produced any content yet.
 *
 * @status experimental
 * @example
 * <AIThinkingIndicator />
 */
export const AIThinkingIndicator = forwardRef<
  HTMLDivElement,
  AIThinkingIndicatorProps
>(function AIThinkingIndicator(props, ref) {
  const { label, ...rest } = props
  const getMessage = useMessageMessagesContext()

  return (
    // biome-ignore lint/a11y/useSemanticElements: spec requires a div carrying role="status"
    <div ref={ref} role="status" data-sl-ai-thinking-indicator {...rest}>
      <AIDotsLoader />
      {label ?? getMessage('thinking')}
    </div>
  )
})
