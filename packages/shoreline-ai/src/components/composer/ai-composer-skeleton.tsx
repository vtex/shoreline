import { Skeleton } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline-utils'

import type { AIComposerSkeletonProps } from './types'

/**
 * Loading placeholder matching composer pill dimensions.
 *
 * @status experimental
 */
export const AIComposerSkeleton = forwardRef<
  HTMLDivElement,
  AIComposerSkeletonProps
>(function AIComposerSkeleton(props, ref) {
  const { compact = false, ...divProps } = props

  if (compact) {
    return (
      <div ref={ref} data-sl-ai-composer-skeleton {...divProps}>
        <Skeleton data-sl-skeleton="composer-input" height="32px" />
      </div>
    )
  }

  return (
    <div ref={ref} data-sl-ai-composer-skeleton {...divProps}>
      <div data-sl-ai-composer-skeleton-field>
        <Skeleton
          data-sl-ai-composer-skeleton-prompt
          height="20px"
          width="68%"
        />
        <div data-sl-ai-composer-skeleton-footer>
          <Skeleton
            data-sl-ai-composer-skeleton-footer-start
            height="36px"
            width="36px"
          />
          <Skeleton shape="circle" height="40px" width="40px" />
        </div>
      </div>
    </div>
  )
})
