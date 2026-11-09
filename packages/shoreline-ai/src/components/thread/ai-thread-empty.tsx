import { useAuiState } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { useAIContextInternal } from '../provider/ai-context'
import type { AIThreadEmptyProps } from './types'

/**
 * Renders children only when the thread has no messages and is not opening.
 *
 * @status experimental
 */
export const AIThreadEmpty = forwardRef<HTMLDivElement, AIThreadEmptyProps>(
  function AIThreadEmpty(props, ref) {
    const { children, ...divProps } = props
    const { isOpeningThread } = useAIContextInternal()
    const isEmpty = useAuiState((s) => s.thread.isEmpty)

    if (isOpeningThread || !isEmpty) {
      return null
    }

    return (
      <div ref={ref} data-sl-ai-thread-empty {...divProps}>
        {children}
      </div>
    )
  }
)
