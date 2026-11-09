import { MessagePrimitive } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { useAIContextInternal } from '../provider/ai-context'
import type { AIMessageRootProps } from './types'

/**
 * Root container for a single message.
 *
 * @status experimental
 */
export const AIMessageRoot = forwardRef<HTMLDivElement, AIMessageRootProps>(
  function AIMessageRoot(props, ref) {
    const { messageRole, children, ...divProps } = props

    useAIContextInternal()

    return (
      <MessagePrimitive.Root
        ref={ref}
        data-sl-ai-message
        data-sl-ai-message-role={messageRole}
        {...divProps}
      >
        <div data-sl-ai-message-content>{children}</div>
      </MessagePrimitive.Root>
    )
  }
)
