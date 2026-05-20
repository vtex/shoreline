import { ThreadPrimitive } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { ThreadMessagesProvider } from './thread-messages-context'
import type { AIThreadProps } from './types'

/**
 * Root container for the chat thread layout.
 *
 * @status experimental
 */
export const AIThread = forwardRef<HTMLDivElement, AIThreadProps>(
  function AIThread(props, ref) {
    const { messages, children, ...divProps } = props

    return (
      <ThreadMessagesProvider messages={messages}>
        <ThreadPrimitive.Root ref={ref} data-sl-ai-thread {...divProps}>
          {children}
        </ThreadPrimitive.Root>
      </ThreadMessagesProvider>
    )
  }
)
