import { Children } from 'react'
import { forwardRef } from '@vtex/shoreline-utils'

import { isAIComposerActions } from './ai-composer-actions'
import type { AIComposerFooterProps } from './types'

/**
 * Footer row with start slot (left) and actions slot (right).
 *
 * @status experimental
 */
export const AIComposerFooter = forwardRef<
  HTMLDivElement,
  AIComposerFooterProps
>(function AIComposerFooter(props, ref) {
  const { children, ...divProps } = props
  const items = Children.toArray(children)
  const start = items.filter((child) => !isAIComposerActions(child))
  const actions = items.filter(isAIComposerActions)

  return (
    <div ref={ref} data-sl-ai-composer-footer {...divProps}>
      <div data-sl-ai-composer-footer-start>{start}</div>
      {actions}
    </div>
  )
})
