import { forwardRef } from '@vtex/shoreline'

import type { AIMessageResourcesProps } from './types'

/**
 * Container for resource message parts.
 *
 * @status experimental
 */
export const AIMessageResources = forwardRef<
  HTMLDivElement,
  AIMessageResourcesProps
>(function AIMessageResources(props, ref) {
  const { children, ...divProps } = props

  return (
    <div ref={ref} data-sl-ai-message-resources {...divProps}>
      {children}
    </div>
  )
})
