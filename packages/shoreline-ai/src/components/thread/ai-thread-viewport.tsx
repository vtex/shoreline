import { ThreadPrimitive } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import type { AIThreadViewportProps } from './types'

/**
 * Scrollable message viewport with auto-scroll on new messages and thread switches.
 *
 * Mount `AIThreadScrollToBottom` as the first child of `AIThreadViewportFooter`.
 *
 * @status experimental
 */
export const AIThreadViewport = forwardRef<
  HTMLDivElement,
  AIThreadViewportProps
>(function AIThreadViewport(props, ref) {
  const {
    autoScroll = true,
    scrollToBottomOnRunStart = true,
    scrollToBottomOnInitialize = true,
    scrollToBottomOnThreadSwitch = true,
    children,
    ...divProps
  } = props

  return (
    <ThreadPrimitive.Viewport
      ref={ref}
      data-sl-ai-thread-viewport
      autoScroll={autoScroll}
      scrollToBottomOnRunStart={scrollToBottomOnRunStart}
      scrollToBottomOnInitialize={scrollToBottomOnInitialize}
      scrollToBottomOnThreadSwitch={scrollToBottomOnThreadSwitch}
      {...divProps}
    >
      {children}
    </ThreadPrimitive.Viewport>
  )
})
