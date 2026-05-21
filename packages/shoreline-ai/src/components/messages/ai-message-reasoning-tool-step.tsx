import { Text, forwardRef } from '@vtex/shoreline'

import type { AIMessageReasoningToolStepProps } from './types'

/**
 * Compact tool step shown inside the reasoning panel.
 *
 * @status experimental
 */
export const AIMessageReasoningToolStep = forwardRef<
  HTMLDivElement,
  AIMessageReasoningToolStepProps
>(function AIMessageReasoningToolStep(props, ref) {
  const { part, ...divProps } = props

  return (
    <div
      ref={ref}
      data-sl-ai-message-reasoning-tool-step
      data-status={part.status}
      {...divProps}
    >
      <Text variant="caption2" color="base-soft">
        {part.name}
      </Text>
    </div>
  )
})
