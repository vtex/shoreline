import { Text, forwardRef } from '@vtex/shoreline'

import type { AIReasoningToolStepProps } from './types'

/**
 * Compact tool step shown inside the reasoning panel.
 *
 * @status experimental
 */
export const AIReasoningToolStep = forwardRef<
  HTMLDivElement,
  AIReasoningToolStepProps
>(function AIReasoningToolStep(props, ref) {
  const { part, ...divProps } = props

  return (
    <div
      ref={ref}
      data-sl-ai-reasoning-tool-step
      data-status={part.status}
      {...divProps}
    >
      <Text variant="caption2" color="base-soft">
        {part.name}
      </Text>
    </div>
  )
})
