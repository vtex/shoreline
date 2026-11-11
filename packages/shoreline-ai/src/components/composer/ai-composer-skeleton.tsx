import { Skeleton } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline'

import type { AIComposerSkeletonProps } from './types'

/**
 * Loading placeholder matching the composer pill dimensions.
 *
 * @status experimental
 * @example
 * <AIComposerSkeleton layout="inline" />
 */
export const AIComposerSkeleton = forwardRef<
  HTMLDivElement,
  AIComposerSkeletonProps
>(function AIComposerSkeleton(props, ref) {
  const { layout = 'stacked', ...divProps } = props

  return (
    <div
      ref={ref}
      data-sl-ai-composer-skeleton
      data-layout={layout}
      {...divProps}
    >
      <Skeleton data-sl-ai-composer-skeleton-pill />
    </div>
  )
})
