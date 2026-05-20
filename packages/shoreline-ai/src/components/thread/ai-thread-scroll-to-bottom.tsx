import { ThreadPrimitive } from '@assistant-ui/react'
import { IconCaretDown } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline'

import { useThreadMessagesContext } from './thread-messages-context'
import type { AIThreadScrollToBottomProps } from './types'

/**
 * Control to scroll the viewport to the latest messages when not at bottom.
 *
 * @status experimental
 */
export const AIThreadScrollToBottom = forwardRef<
  HTMLButtonElement,
  AIThreadScrollToBottomProps
>(function AIThreadScrollToBottom(props, ref) {
  const { children, ...buttonProps } = props
  const getMessage = useThreadMessagesContext()

  return (
    <ThreadPrimitive.ScrollToBottom
      ref={ref}
      type="button"
      data-sl-ai-thread-scroll-to-bottom
      aria-label={getMessage('scrollToBottom')}
      {...buttonProps}
    >
      {children ?? <IconCaretDown />}
    </ThreadPrimitive.ScrollToBottom>
  )
})
