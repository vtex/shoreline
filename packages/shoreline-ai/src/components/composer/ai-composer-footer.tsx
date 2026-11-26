import { useEffect, useRef } from 'react'
import { forwardRef } from '@vtex/shoreline'

import { isAIComposerActions } from './ai-composer-actions'
import { flattenFragments } from './utils'
import type { AIComposerFooterProps } from './types'

/**
 * Footer row with start slot (left) and actions slot (right).
 *
 * It finds `AIComposerActions` among its children, through Fragments. A custom
 * component that renders `AIComposerActions` is not seen: wrap the content of
 * `AIComposerActions` in your component instead.
 *
 * @status experimental
 * @example
 * <AIComposerFooter>
 *   <AIComposerAddAttachment />
 *   <AIComposerActions>
 *     <AIComposerAction />
 *   </AIComposerActions>
 * </AIComposerFooter>
 */
export const AIComposerFooter = forwardRef<
  HTMLDivElement,
  AIComposerFooterProps
>(function AIComposerFooter(props, ref) {
  const { children, ...divProps } = props
  const startRef = useRef<HTMLDivElement>(null)
  const items = flattenFragments(children)
  const start = items.filter((child) => !isAIComposerActions(child))
  const actions = items.filter(isAIComposerActions)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return

    if (startRef.current?.querySelector('[data-sl-ai-composer-actions]')) {
      console.warn(
        'AIComposerFooter: an AIComposerActions is rendered by a custom component, so it sits in the start slot (left) instead of the actions slot (right). Keep AIComposerActions as a direct child of AIComposerFooter and put your component inside it.'
      )
    }
  })

  return (
    <div ref={ref} data-sl-ai-composer-footer {...divProps}>
      <div ref={startRef} data-sl-ai-composer-footer-start>
        {start}
      </div>
      {actions}
    </div>
  )
})
