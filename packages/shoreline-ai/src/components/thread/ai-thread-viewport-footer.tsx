import { ThreadPrimitive } from '@assistant-ui/react'
import { Flex, forwardRef } from '@vtex/shoreline'

import type { AIThreadViewportFooterProps } from './types'

/**
 * Sticky footer inside the viewport; height is measured for auto-scroll inset.
 *
 * @status experimental
 */
export const AIThreadViewportFooter = forwardRef<
  HTMLDivElement,
  AIThreadViewportFooterProps
>(function AIThreadViewportFooter(props, ref) {
  const { children, ...divProps } = props

  return (
    <ThreadPrimitive.ViewportFooter asChild>
      <Flex
        ref={ref}
        data-sl-ai-thread-viewport-footer
        direction="column"
        {...divProps}
      >
        {children}
      </Flex>
    </ThreadPrimitive.ViewportFooter>
  )
})
