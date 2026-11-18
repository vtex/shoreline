import { forwardRef } from '@vtex/shoreline'

import { AIMessageCopy } from './ai-message-copy'
import type { AIMessageActionsProps } from './types'

/**
 * Action row shown under a completed assistant message. Renders the copy
 * control first, then any children (for example feedback buttons).
 *
 * @status experimental
 * @example
 * <AIMessageActions />
 */
export const AIMessageActions = forwardRef<
  HTMLDivElement,
  AIMessageActionsProps
>(function AIMessageActions(props, ref) {
  const { children, ...rest } = props

  return (
    <div ref={ref} data-sl-ai-message-actions {...rest}>
      <AIMessageCopy />
      {children}
    </div>
  )
})
